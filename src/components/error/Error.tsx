import { Component, ReactNode } from 'react';
import * as Sentry from '@sentry/react';

function FallbackComponent({ message }: { message: string }) {
  return <div>An error has occurred: {message}</div>;
}

interface Props {
  children?: ReactNode;
  message: string;
}

class ErrorBoundary extends Component<Props> {
  render() {
    return (
      <Sentry.ErrorBoundary fallback={<FallbackComponent message={this.props.message} />} showDialog>
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}

export default ErrorBoundary;
