import GoalDetailScreen from "@/screens/GoalDetail";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Goal(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen}/> 
    </Stack.Navigator>
  )
}