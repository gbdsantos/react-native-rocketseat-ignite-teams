import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    'Galera da Rocket',
    'Amigos'
  ]);

  return (
    <Container>
      <Header />
      <Highlight
        subtitle="jogue com a sua turma"
        title="Turmas"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => { }}
          />
        )}
      />
    </Container>
  );
}
