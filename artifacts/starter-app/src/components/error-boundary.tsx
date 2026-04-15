import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center min-h-[60vh] px-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <h2
            className="text-2xl mb-2"
            style={{ fontFamily: "Pilat Demi", color: "#1E1450" }}
          >
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="cursor-pointer inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#1E1450", fontFamily: "Inter, sans-serif" }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
