import { Alert, FlatList, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Container,
  Form,
  HeaderList,
  MumbersOfPlayers
} from './styles';

import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Loading } from '@components/Loading';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';

import { AppError } from '@utils/AppError';

import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const { navigate } = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');

      await fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);

      setIsLoading(false);

    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover grupo', 'Não foi possível remover o grupo.');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Tem certeza que deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    );
  }

  useEffect(() => {

    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          autoCorrect={false}
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          placeholder="Nome da pessoa"
          returnKeyType="done"
          value={newPlayerName}
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          horizontal
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              isActive={item === team}
              onPress={() => setTeam(item)}
              title={item}
            />
          )}
        />
        <MumbersOfPlayers>
          {players.length}
        </MumbersOfPlayers>
      </HeaderList>


      {
        isLoading ? <Loading /> :
          <FlatList
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 }
            ]}
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => { handlePlayerRemove(item.name) }}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <ListEmpty
                message="Não há pessoas nesse time."
              />
            )}
          />
      }

      <Button
        onPress={handleGroupRemove}
        title="Remover turma"
        type="SECONDARY"
      />
    </Container>
  );
}
