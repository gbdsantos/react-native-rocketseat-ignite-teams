import { Container, Message } from "./styles";

type Props = {
  message: string;
}

export function ListEmpty({ message, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Message>
        {message}
      </Message>
    </Container>
  );
}
