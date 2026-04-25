import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>Something went wrong.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{ padding: "0.5rem 1rem", border: "1px solid #ef4444", borderRadius: "0.5rem", color: "#ef4444", cursor: "pointer" }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
