import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppError } from '@utils/AppError';

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
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.');
      }

      await groupCreate(group);
      navigate('players', { group });

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.');
        console.log(error);
      }
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
