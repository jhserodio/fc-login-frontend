import { render } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>,
    );

    expect(getByText('Test Content')).toBeDefined();
  });
});
