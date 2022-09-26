import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight
        subtitle="jogue com a sua turma"
        title="Turmas"
      />

      <GroupCard
        title="Galera do Ignite"
        onPress={() => { }}
      />
    </Container>
  );
}
