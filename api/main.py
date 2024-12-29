from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Cassandra
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
import json

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI embeddings
embeddings = OpenAIEmbeddings()

# Load project data
with open("data/projects.json", "r") as f:
    projects_data = json.load(f)

# Create vector store with AstraDB
astra_db_id = os.getenv("ASTRA_DB_ID")
astra_db_region = os.getenv("ASTRA_DB_REGION")
astra_db_keyspace = os.getenv("ASTRA_DB_KEYSPACE")
astra_db_token = os.getenv("ASTRA_DB_APPLICATION_TOKEN")

vector_store = Cassandra(
    db_id=astra_db_id,
    region=astra_db_region,
    keyspace=astra_db_keyspace,
    application_token=astra_db_token,
    embedding=embeddings
)

# Add project data to vector store
texts = [
    f"Project: {p['title']}\nDescription: {p['description']}\nTimeline: {p['timeline']}\nTags: {', '.join(p['tags'])}"
    for p in projects_data
]
vector_store.add_texts(texts=texts)

# Initialize chat model and retrieval chain
llm = ChatOpenAI(temperature=0.7)
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vector_store.as_retriever(),
    return_source_documents=True
)

class Query(BaseModel):
    question: str
    chat_history: Optional[List[tuple]] = []

@app.post("/api/chat")
async def chat_endpoint(query: Query):
    try:
        # Get response from chain
        result = qa_chain({"question": query.question, "chat_history": query.chat_history})
        
        return {
            "answer": result["answer"],
            "source_documents": [doc.page_content for doc in result["source_documents"]]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
