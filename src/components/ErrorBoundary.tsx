'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return (
        <div className="alert alert-danger m-3">
          <h5>Something went wrong</h5>
          <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
          <button className="btn btn-outline-danger btn-sm" onClick={this.resetError}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="alert alert-danger m-3">
      <h5>Chat Error</h5>
      <p>There was an error loading the chat. Please try again.</p>
      <details className="mt-2">
        <summary>Error Details</summary>
        <pre className="small text-muted mt-2">{error.message}</pre>
      </details>
      <button className="btn btn-outline-danger btn-sm mt-2" onClick={resetError}>
        Retry
      </button>
    </div>
  );
}
