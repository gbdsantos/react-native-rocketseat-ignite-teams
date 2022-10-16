import {
  useCallback,
  useState
} from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { Container } from './styles';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      const data = await groupsGetAll();

      setGroups(data);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
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

      {
        isLoading ? <Loading /> :
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
      }

      <Button
        onPress={handleNewGroup}
        title="Criar nova turma"
      />
    </Container>
  );
}
