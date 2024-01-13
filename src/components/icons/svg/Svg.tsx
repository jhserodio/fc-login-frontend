import { ReactNode } from 'react';
import style from './svg.module.css';

export type SvgProps = {
  children: ReactNode;
  fill?: string;
  viewBox?: {
    minX: number;
    minY: number;
  };
  size?: {
    width: number;
    height: number;
  };
};

export const Svg = ({
  children,
  viewBox = { minX: 0, minY: 0 },
  size = { width: 32, height: 32 },
  fill = 'currentColor',
}: SvgProps) => {
  const { minX, minY } = viewBox;
  const { width, height } = size;

  return (
    <svg
      data-testid="svg"
      viewBox={`${minX} ${minY} ${width} ${height}`}
      width={size.width}
      height={size.height}
      className={style.svg}
      fill={fill}
    >
      {children}
    </svg>
  );
};
