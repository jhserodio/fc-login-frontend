import { Path, paths } from '../paths';
import { Svg, SvgProps } from '../svg/Svg';

interface Props extends Omit<SvgProps, 'className' | 'children'> {
  name: Path;
}

export const Icon = (props: Props) => (
  <Svg {...props}>
    <path d={paths[props.name]} />
  </Svg>
);
