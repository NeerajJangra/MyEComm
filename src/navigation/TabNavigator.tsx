import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useThemeStore} from '../core/useThemeStore';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { themeColors} = useThemeStore();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName: string = 'home';

          if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Cart')
            iconName = focused ? 'cart' : 'cart-outline';
          if (route.name === 'Profile')
            iconName = focused ? 'person' : 'person-outline';

          return (
            <Icon
              name={iconName}
              size={24}
              color={focused ? themeColors.text : '#999'}
            />
          );
        },
        tabBarStyle: {
          justifyContent: 'center',
          height: 60,
          paddingBottom: 5,
          backgroundColor: themeColors.background,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
