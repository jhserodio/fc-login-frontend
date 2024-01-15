import { Background } from '../background';
import { Container } from '../container';

interface Props {
  message: string;
}

export function FallbackComponent({ message }: Props) {
  return (
    <Background>
      <Container>
        <div>An error has occurred: {message}</div>
      </Container>
    </Background>
  );
}
