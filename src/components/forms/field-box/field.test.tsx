import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { Field } from './Field';

jest.mock('../../hint/Hint', () => ({
  Hint: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe('Field', () => {
  it('renders without error', () => {
    render(
      <Field label="Test Label">
        <div>Test Child</div>
      </Field>,
    );
    expect(screen.getByText('Test Label')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
  });

  it('renders with error', () => {
    render(
      <Field label="Test Label" error="Test Error">
        <div>Test Child</div>
      </Field>,
    );
    expect(screen.getByText('Test Label')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
    expect(screen.getByText('Test Error')).toBeDefined();
  });
});
