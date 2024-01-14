import { render, screen } from '@testing-library/react';
import { BtnSubmit } from './BtnSubmit';

jest.mock('../../icons', () => ({
  Icon: jest.fn().mockReturnValue(<div>Mocked Icon</div>),
}));

describe('BtnSubmit', () => {
  it('should render children when loading is true', () => {
    render(<BtnSubmit loading={true}>Test</BtnSubmit>);
    expect(screen.getByText('Mocked Icon')).toBeDefined();
    expect(screen.queryByText('Test')).toBeNull();
  });

  it('should render Icon when loading is false', () => {
    render(<BtnSubmit loading={false}>Test</BtnSubmit>);
    expect(screen.getByText('Test')).toBeDefined();
    expect(screen.queryByText('Mocked Icon')).toBeNull();
  });
});
