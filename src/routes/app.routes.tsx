import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutess() {
  return (
    <Navigator>
      <Screen
        component={Groups}
        name="groups"
      />

      <Screen
        component={NewGroup}
        name="new"
      />

      <Screen
        component={Players}
        name="players"
      />
    </Navigator>
  );
}
