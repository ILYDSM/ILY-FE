import CreateGroup from '@/screens/CreateGroup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupCategory from '@/screens/GroupCategory';
import SearchResult from '@/screens/SearchResult';

const Stack = createNativeStackNavigator();

const Group = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="GroupCategory" component={GroupCategory} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
    </Stack.Navigator>
  );
};

export default Group;
