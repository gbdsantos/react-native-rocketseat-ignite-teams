import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  Icon
} from './styles';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function NewGroup() {
  const { navigate } = useNavigation();

  function handleNew() {
    navigate('players', { group: 'Lorem Inpsum' });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          subtitle="Crie a turma para adicionar as pessoas"
          title="Nova turma"
        />

        <Input
          placeholder="Nome da turma"
        />

        <Button
          onPress={handleNew}
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
