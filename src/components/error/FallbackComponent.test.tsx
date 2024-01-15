import { render } from '@testing-library/react';
import { FallbackComponent } from './FallbackComponent';

test('renders error message', () => {
  const errorMessage = 'Something went wrong';
  const { getByText } = render(<FallbackComponent message={errorMessage} />);
  const errorElement = getByText(`An error has occurred: ${errorMessage}`);
  expect(errorElement).toBeDefined();
});
