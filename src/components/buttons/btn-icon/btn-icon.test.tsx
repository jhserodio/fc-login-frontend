import { render, fireEvent } from '@testing-library/react';
import { BtnIcon } from './BtnIcon';
import { Icon } from '../../icons';

describe('BtnIcon', () => {
  it('should render', () => {
    const wrap = render(
      <BtnIcon onClick={() => {}}>
        <Icon name="bug" />
      </BtnIcon>,
    );
    expect(wrap).toBeDefined();
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
