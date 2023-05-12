import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from "./navigators/RootNavigator";
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

function LaunchScreen({ navigation }) {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('MainApp');
      }, 3000); // Navigate to MainApp after 3 seconds
      return () => clearTimeout(timer);
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });