import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';
import './index.css';

// #region agent log
fetch('http://127.0.0.1:7866/ingest/0558fb5f-4a5e-487e-a4e2-797280a236e6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'efe27c'},body:JSON.stringify({sessionId:'efe27c',location:'main.tsx:10',message:'App initialization started',data:{rootElement:document.getElementById('root')?.tagName},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
