import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';

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
  const [group, setGroup] = useState('');
  const { navigate } = useNavigation();

  async function handleNew() {
    try {
      await groupCreate(group);
      navigate('players', { group });

    } catch (error) {
      console.log(error);
    }
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
          onChangeText={setGroup}
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
