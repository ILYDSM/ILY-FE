import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalCreateDetail from "@/screens/GoalCreateDetail";
import GoalCreateMain from "@/screens/GoalCreateMain";
import GoalCreateResult from "@/screens/GoalCreateResult";
import GoalCreateSub from "@/screens/GoalCreateSub";
import GoalCreateTheme from "@/screens/GoalCreateTheme";
import GoalDetailScreen from "@/screens/GoalDetail";
import GoalGroupBoard from "@/screens/GoalGroupBoard";
import GoalJoinRequest from "@/screens/GoalJoinRequest";

const Stack = createNativeStackNavigator();

export default function Goal(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen}/> 
      <Stack.Screen name="GoalGroupBoard" component={GoalGroupBoard}/> 
      <Stack.Screen name="GoalJoinRequest" component={GoalJoinRequest}/> 
      <Stack.Screen name="GoalCreateMain" component={GoalCreateMain}/>
      <Stack.Screen name="GoalCreateSub" component={GoalCreateSub}/>
      <Stack.Screen name="GoalCreateDetail" component={GoalCreateDetail}/>
      <Stack.Screen name="GoalCreateResult" component={GoalCreateResult}/>
      <Stack.Screen name="GoalCreateTheme" component={GoalCreateTheme}/>
    </Stack.Navigator>
  )
}