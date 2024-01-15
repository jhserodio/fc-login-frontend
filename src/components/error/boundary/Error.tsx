import { Component, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { Fallback } from '../fallback/Fallback';

interface Props {
  children?: ReactNode;
  message: string;
}

export class ErrorBoundary extends Component<Props> {
  render() {
    return (
      <Sentry.ErrorBoundary fallback={<Fallback message={this.props.message} />} showDialog>
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}
