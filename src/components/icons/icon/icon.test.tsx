import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('should render the icon', () => {
    const wrap = render(<Icon name="check" />);
    expect(wrap.container).toBeDefined();
  });
});
