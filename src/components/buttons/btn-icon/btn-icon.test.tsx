import { render, fireEvent } from '@testing-library/react';
import { BtnIcon } from './BtnIcon';
import { Icon } from '../../icons';
import * as classes from '../../../utils/classes';

describe('BtnIcon', () => {
  const clsSpy = jest.fn();
  jest.spyOn(classes, 'cls').mockImplementation(clsSpy);

  beforeEach(() => {
    clsSpy.mockReset();
  });

  it('should default render', () => {
    const wrap = render(
      <BtnIcon onClick={() => {}}>
        <Icon name="bug" />
      </BtnIcon>,
    );

    expect(wrap).toBeDefined();
    expect(clsSpy).toHaveBeenCalledWith(['btn', '__default']);
  });

  it('should render with custom status', () => {
    const wrap = render(
      <BtnIcon onClick={() => {}} status="ok">
        <Icon name="bug" />
      </BtnIcon>,
    );

    expect(wrap).toBeDefined();
    expect(clsSpy).toHaveBeenCalledWith(['btn', '__ok']);
  });

  it('calls onClick when button is clicked', () => {
    const onClickMock = jest.fn();
    const wrap = render(
      <BtnIcon onClick={onClickMock}>
        <Icon name="bug" />
      </BtnIcon>,
    );
    fireEvent.click(wrap.getByTestId('btn-icon'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
