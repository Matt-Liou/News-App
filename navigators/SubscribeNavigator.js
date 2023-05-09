import * as React from "react";
import { View, StyleSheet, Image, Text, TextInput, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubscribeScreen from '../screens/SubscribeScreen';
import EditScreen from "../screens/EditScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DataProvider } from "../subscrition_data/SubData";

const SubscribeNavigator = () => {
    const Tab = createBottomTabNavigator();

    const [email, setEmail] = React.useState('')
    const [subEmails, setSubEmails] = React.useState([]);

    return (
      <NavigationContainer independent = {true}>
      <Tab.Navigator
          screenOptions={{
              headerShown: false
          }}>
          <Tab.Screen 
              name="Subscribe" 
              component={SubscribeScreen} 
              options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-newspaper" size={size} color={color} />
                  ),
              }}
          />
          <Tab.Screen 
              name="Edit" 
              component={EditScreen}
              options={{
                  tabBarIcon: ({ color, size }) => (
                      <Ionicons name="create-outline" size={size} color={color} />
                  ),
              }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
  
export default SubscribeNavigator;