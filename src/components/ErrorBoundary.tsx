import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // #region agent log
    fetch('http://127.0.0.1:7866/ingest/0558fb5f-4a5e-487e-a4e2-797280a236e6',{
      method:'POST',
      headers:{'Content-Type':'application/json','X-Debug-Session-Id':'efe27c'},
      body:JSON.stringify({
        sessionId:'efe27c',
        location:'ErrorBoundary.tsx:30',
        message:'React error caught',
        data:{errorMessage:error.message,errorStack:error.stack,errorInfo},
        timestamp:Date.now(),
        runId:'run1',
        hypothesisId:'ERROR'
      })
    }).catch(()=>{});
    // #endregion
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-8 text-red-900">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <pre className="bg-white p-4 rounded overflow-auto text-sm">
            {this.state.error?.message}
            {'\n'}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
