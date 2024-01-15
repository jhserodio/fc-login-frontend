import { render } from '@testing-library/react';
import { Background } from './Background';

describe('Background', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Background>
        <div>Test Content</div>
      </Background>,
    );

    expect(getByText('Test Content')).toBeDefined();
  });
});
