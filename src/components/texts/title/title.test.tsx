import { render, screen } from '@testing-library/react';
import { Title } from './Title';

describe('Title', () => {
  it('renders the correct tag and class', () => {
    render(<Title level="h1">Teste</Title>);
    const titleElement = screen.getByText('Teste');
    expect(titleElement.tagName).toBe('H1');
    expect(titleElement.getAttribute('class')).toBe('title');
  });

  it('renders the correct text', () => {
    render(<Title level="h2">Teste</Title>);
    expect(screen.getByText('Teste')).toBeDefined();
  });

  it('renders with captalize', () => {
    render(
      <Title level="h1" captalize>
        Teste
      </Title>,
    );
    const titleElement = screen.getByText('Teste');
    expect(titleElement.getAttribute('class')).toBe('title __captalize');
  });
});
