import { render, screen } from '@testing-library/react';
import { Svg } from './Svg'; // caminho para o seu componente
import * as classes from '../../../utils/classes';

describe('Svg Component', () => {
  const pathMock = (
    <path d="M15.3 14.89l2.77 2.77c0.18 0.181 0.291 0.43 0.291 0.705s-0.111 0.524-0.291 0.705l0-0c-0.181 0.18-0.43 0.291-0.705 0.291s-0.524-0.111-0.705-0.291l0 0-2.59-2.58c-0.825 0.765-1.872 1.303-3.034 1.505l-0.036 0.005v-8.96c0-0.552-0.448-1-1-1s-1 0.448-1 1v0 8.96c-1.198-0.207-2.245-0.744-3.074-1.513l0.004 0.003-2.59 2.58c-0.181 0.18-0.43 0.291-0.705 0.291s-0.524-0.111-0.705-0.291l0 0c-0.18-0.181-0.291-0.43-0.291-0.705s0.111-0.524 0.291-0.705l2.77-2.77c-0.298-0.547-0.518-1.183-0.626-1.856l-0.004-0.034h-3.070c-0.552 0-1-0.448-1-1s0.448-1 1-1v0h3v-2.59l-3.070-3.070c-0.18-0.181-0.291-0.43-0.291-0.705s0.111-0.524 0.291-0.705l-0 0c0.181-0.18 0.43-0.291 0.705-0.291s0.524 0.111 0.705 0.291l2.1 2.1h11.12l2.1-2.1c0.181-0.18 0.43-0.291 0.705-0.291s0.524 0.111 0.705 0.291l-0-0c0.18 0.181 0.291 0.43 0.291 0.705s-0.111 0.524-0.291 0.705l-3.070 3.070v2.59h3c0.552 0 1 0.448 1 1s-0.448 1-1 1v0h-3.070c-0.1 0.67-0.32 1.31-0.63 1.89zM15 5h-10c0-2.761 2.239-5 5-5s5 2.239 5 5v0z" />
  );

  const clsSpy = jest.fn();
  jest.spyOn(classes, 'cls').mockImplementation(clsSpy);

  beforeEach(() => {
    clsSpy.mockReset();
  });

  it('renders correctly', () => {
    render(<Svg>{pathMock}</Svg>);

    const svgElement = screen.getByTestId('svg');
    expect(svgElement).toBeDefined();
  });

  it('applies custom fill', () => {
    render(<Svg fill="red">Teste</Svg>);

    const svgElement = screen.getByTestId('svg');
    expect(svgElement.getAttribute('fill')).toBe('red');
  });

  it('applies custom size', () => {
    render(<Svg size={{ width: 50, height: 50 }}>Teste</Svg>);

    const svgElement = screen.getByTestId('svg');
    expect(svgElement.getAttribute('width')).toBe('50');
    expect(svgElement.getAttribute('height')).toBe('50');
  });

  it('applies custom viewBox', () => {
    render(<Svg viewBox={{ minX: 10, minY: 20 }}>Teste</Svg>);

    const svgElement = screen.getByTestId('svg');
    expect(svgElement.getAttribute('viewBox')).toBe('10 20 32 32');
  });
});
