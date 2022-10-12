import {
  useCallback,
  useState
} from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    'Galera da Rocket',
    'Amigos'
  ]);

  const { navigate } = useNavigation();

  function handleNewGroup() {
    navigate('new');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        subtitle="jogue com a sua turma"
        title="Turmas"
      />

      <FlatList
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Que tal cadastrar a primeira turma?"
          />
        )}
      />
      <Button
        onPress={handleNewGroup}
        title="Criar nova turma"
      />
    </Container>
  );
}
