import React, { Component, ReactNode } from "react";
import cn from "classnames";
import styles from "./ErrorBoundary.module.css";

interface Props { children: ReactNode }
interface State { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={cn(styles.wrapper)}>
          <p className={cn(styles.message)}>Something went wrong.</p>
          <button className={cn(styles.retryBtn)} onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
