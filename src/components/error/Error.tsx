import { Component, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { FallbackComponent } from './FallbackComponent';

interface Props {
  children?: ReactNode;
  message: string;
}

export class ErrorBoundary extends Component<Props> {
  render() {
    return (
      <Sentry.ErrorBoundary
        fallback={<FallbackComponent message={this.props.message} />}
        showDialog
      >
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}
