import { Container, Form } from './styles';

import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function Players() {
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

      <Filter
        isActive
        title="Time A"
      />
    </Container>
  );
}
