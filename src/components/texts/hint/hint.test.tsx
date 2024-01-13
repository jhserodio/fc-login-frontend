import { render } from '@testing-library/react';
import { Hint, HintProps } from './Hint';
import * as classes from '../../../utils/classes';

describe('Hint', () => {
  const defaultProps: HintProps = {
    status: 'default',
    children: <div>Test</div>,
  };

  const clsSpy = jest.fn();
  jest.spyOn(classes, 'cls').mockImplementation(clsSpy);

  beforeEach(() => {
    clsSpy.mockReset();
  });

  it('should be rendered', () => {
    const { getByText } = render(<Hint {...defaultProps} />);
    expect(getByText('Test')).toBeDefined();
  });

  it('should call cls with an array with two elements', () => {
    render(<Hint {...defaultProps} />);

    expect(clsSpy).toHaveBeenCalledTimes(1);
    expect(clsSpy.mock.lastCall[0].length).toBe(2);
  });
});
