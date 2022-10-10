import { useState } from 'react';
import { FlatList } from 'react-native';

import {
  Container,
  Form,
  HeaderList,
  MumbersOfPlayers
} from './styles';

import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          autoCorrect={false}
          placeholder="Nome da pessoa"
        />
        <ButtonIcon
          icon="add"
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
    </Container>
  );
}
