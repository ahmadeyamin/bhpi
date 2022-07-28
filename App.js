import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screen/Home';
import NoticeScreen from './src/Screen/Notice/Index';
import NoticeDetailScreen from './src/Screen/Notice/NoticeDetail';
import AboutScreen from './src/Screen/About';
import TechnologyScreen from './src/Screen/Technology';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="TechnologyScreen" 
                component={TechnologyScreen} 
                options={{
                    // headerShown: false
                    headerTitle: 'Technology',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    // statusBarColor: 'transparent',
                }}
            />
        </Stack.Navigator>
    );
}

const Notices = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="NoticeScreen" 
                component={NoticeScreen} 
                options={{
                    // headerShown: false
                    headerTitle: 'Notices',
                }}
            />
            <Stack.Screen 
                name="NoticeDetailScreen" 
                component={NoticeDetailScreen} 
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>

            <Tab.Navigator
            >
                <Tab.Screen 
                    name="Home"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <Icon name="home" color={color} size={size} />
                        ),
                        headerShown: false,
                        tabBarActiveTintColor: '#7556f7',
                        tabBarShowLabel: false,
                      }}
                    
                    headerShown={false}
                    component={Home} 
                />
                <Tab.Screen 
                    name="Notices" 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <Icon name="bell" color={color} size={size} />
                        ),
                        headerShown: false,
                        tabBarActiveTintColor: '#7556f7',
                        tabBarShowLabel: false,
                      }}
                    
                    headerShown={false}
                    component={Notices} 
                />
                <Tab.Screen 
                    name="About" 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <Icon name="account-group" color={color} size={size} />
                        ),
                        headerShown: false,
                        tabBarActiveTintColor: '#7556f7',
                        tabBarShowLabel: false,
                      }}
                    
                    component={AboutScreen} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
