import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log to error reporting service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-border-danger bg-bg-danger">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-danger bg-white">
              <AlertTriangle className="h-6 w-6 text-danger" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Something went wrong
              </h2>
              <p className="text-sm text-text-secondary mb-4 max-w-md">
                {process.env.NODE_ENV === 'development' 
                  ? this.state.error?.message || 'An unexpected error occurred'
                  : 'The application encountered an error. Please try refreshing the page.'
                }
              </p>
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="text-left text-xs text-text-subtle mb-4">
                  <summary className="cursor-pointer font-mono bg-surface-muted p-2 rounded">
                    Error Stack
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-white px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
