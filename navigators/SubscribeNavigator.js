import * as React from "react";
import { View, StyleSheet, Image, Text, TextInput, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SubscribeScreen from '../screens/SubscribeScreen';
import EditScreen from "../screens/EditScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DataProvider } from "../datas/SubData";

/**
 * SubscribeNavigator component for the application.
 *
 * This component sets up a bottom tab navigator for the subscription-related screens using 
 * `createBottomTabNavigator` from React Navigation. It includes two primary screens:
 * - SubscribeScreen: A screen where users can subscribe to a newsletter.
 * - EditScreen: A screen for managing existing newsletter subscriptions.
 *
 * Each tab in the navigator is represented by an icon, provided by the Ionicons package.
 * The 'NavigationContainer' is used here with the 'independent' prop set to true, indicating that
 * this navigator functions independently from any parent navigators.
 *
 * @component
 * @returns {React.Component} The SubscribeNavigator component with the defined tab navigation.
 */
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