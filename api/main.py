from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from astrapy.db import AstraDB
from langchain.chat_models import ChatOpenAI
import json
import openai

load_dotenv()

app = FastAPI()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AstraDB client
astra_db = AstraDB(
    token=os.getenv("ASTRA_DB_APPLICATION_TOKEN"),
    api_endpoint=f"https://{os.getenv('ASTRA_DB_ID')}-{os.getenv('ASTRA_DB_REGION')}.apps.astra.datastax.com/api/rest"
)

# Initialize OpenAI
llm = ChatOpenAI(temperature=0.7)

# Load and store project data
with open("data/projects.json", "r") as f:
    projects_data = json.load(f)

# Create collection if it doesn't exist
collection = astra_db.create_collection("projects", dimension=1536)

# Store project data
for project in projects_data:
    text = f"Project: {project['title']}\nDescription: {project['description']}\nTimeline: {project['timeline']}\nTags: {', '.join(project['tags'])}"
    response = openai.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    doc = {
        "title": project["title"],
        "description": project["description"],
        "timeline": project["timeline"],
        "tags": project["tags"],
        "embedding": response.data[0].embedding
    }
    collection.insert_one(doc)

class Query(BaseModel):
    question: str
    chat_history: Optional[List[tuple]] = []

@app.post("/api/chat")
async def chat_endpoint(query: Query):
    try:
        # Get embedding for the question
        response = openai.embeddings.create(
            model="text-embedding-ada-002",
            input=query.question
        )
        question_embedding = response.data[0].embedding
        
        # Search for similar documents
        results = collection.vector_find(
            vector=question_embedding,
            limit=3
        )
        
        # Format context from results
        context = "\n\n".join([
            f"Project: {doc['title']}\nDescription: {doc['description']}\nTimeline: {doc['timeline']}\nTags: {', '.join(doc['tags'])}"
            for doc in results
        ])
        
        # Generate response using OpenAI
        prompt = f"""Based on the following project information, answer this question: {query.question}

Context:
{context}

Please provide a relevant and concise answer based on the project information above."""
        
        response = llm.predict(prompt)
        
        return {
            "answer": response,
            "source_documents": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
