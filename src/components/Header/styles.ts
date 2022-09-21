import styled from 'styled-components/native';
import { CaretLeft } from 'phosphor-react-native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const Logo = styled.Image`
  height: 55px;
  width: 46px;
`

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`

export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
  size: 32
}))`

`;
