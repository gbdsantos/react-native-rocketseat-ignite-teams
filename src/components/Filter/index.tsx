import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  FilterStyleProps,
  Title
} from './styles';

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string;
}

export function Filter({ isActive = false, title, ...rest }: Props) {
  return (
    <Container
      {...rest}
    >
      <Title>
        {title}
      </Title>
    </Container>
  );
}
