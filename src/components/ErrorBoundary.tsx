import { Container } from "@mui/material";
import React from "react";

interface State {
  error: any;
  errorInfo: any;
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state?.errorInfo) {
      // Error path
      return (
        <Container>
          <h2>Something went wrong.</h2>
          <details
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "pink",
              padding: 2,
            }}
          >
            <pre>{this.state.error && this.state.error.toString()}</pre>
            <br />
            <code>{this.state.errorInfo.componentStack}</code>
          </details>
        </Container>
      );
    }
    // Normally, just render children
    //@ts-ignore
    return this.props?.children!;
  }
}

export default ErrorBoundary;
