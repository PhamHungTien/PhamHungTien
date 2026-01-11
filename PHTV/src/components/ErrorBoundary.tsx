import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-white">
          <div className="rounded-xl bg-slate-900 p-8 text-center shadow-2xl border border-white/10">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Đã xảy ra lỗi!</h2>
            <p className="mb-6 text-slate-400">Rất tiếc, trang web gặp sự cố không mong muốn.</p>
            <p className="mb-6 text-xs text-slate-600 font-mono bg-black/30 p-2 rounded max-w-md overflow-x-auto text-left">
              {this.state.error?.toString()}
            </p>
            <button
              className="rounded-lg bg-brand-500 px-6 py-2.5 font-bold text-white hover:bg-brand-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
