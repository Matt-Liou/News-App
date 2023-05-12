import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import NewsApp from "../screens/NewsApp";
import SubscribeNavigator from "./SubscribeNavigator";
import { DataProvider } from "../subscrition_data/SubData";
import newsLogo from '../assets/icons8-news-420.png';

const Stack = createNativeStackNavigator();

//Launch Screen Compoment
function LaunchScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('NewsApp');
    }, 1500); // Navigate to MainApp after 1.5 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        style={{height: 80, width: 80}} 
        source={newsLogo}
      />
      <View style={{marginTop: 10}}>
        <ActivityIndicator size="small" color="grey" />
      </View>
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

const RootNavigator = () => {
  return (
    <DataProvider>
      <Stack.Navigator initialRouteName="LaunchScreen">
        <Stack.Screen 
          name="LaunchScreen" 
          component={LaunchScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="NewsApp"
          component={NewsApp}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#FFC221',
            },
          }}
        />
        <Stack.Screen
          name="Subscribe"
          component={SubscribeNavigator}
          options={{
            headerStyle: {
              backgroundColor: 'white', 
            },
            //headerTintColor: 'black',
          }}
        />
      </Stack.Navigator>
    </DataProvider>
  );
};

export default RootNavigator;
