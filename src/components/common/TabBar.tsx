import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { TouchableOpacity, View, Text, GestureResponderEvent } from 'react-native';
import { Goal, Grid, Group, Home, Menu, Users } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from '@/navigations/Auth';
import HomeScreen from '@/screens/Home';
import GoalScreen from '@/screens/Goal';
import GroupScreen from '@/screens/Group';
import MenuScreen from '@/screens/Menu';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#B3B3B3',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            case '홈':
              icon = <Home color={color} size={size} />;
              break;
            case '목표':
              icon = <Grid color={color} size={size} />;
              break;
            case '모임':
              icon = <Users color={color} size={size} />;
              break;
            case '메뉴':
              icon = <Menu color={color} size={size} />;
              break;
            default:
              return;
          }
          return icon;
        },
        tabBarLabel: ({ color }) => {
          let label = '';
          switch (route.name) {
            case '홈':
              label = '홈';
              break;
            case '목표':
              label = '목표';
              break;
            case '모임':
              label = '모임';
              break;
            case '메뉴':
              label = '메뉴';
              break;
            default:
              return;
          }
          return <Text style={{ color, fontSize: 12, fontFamily: '500' }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="목표" component={GoalScreen} />
      <Tab.Screen name="모임" component={GroupScreen} />
      <Tab.Screen name="메뉴" component={MenuScreen} />
    </Tab.Navigator>
  );
};
