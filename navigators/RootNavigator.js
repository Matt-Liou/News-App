import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import NewsApp from "../screens/NewsApp";
import SubscribeNavigator from "./SubscribeNavigator";
import { DataProvider } from "../datas/SubData";
import newsLogo from '../assets/icons8-news-420.png';
import { TransitionPresets } from '@react-navigation/stack';
import { NewsContext } from '../datas/NewsContext';

const Stack = createNativeStackNavigator();
const API_KEY = 'f4d9c81e82e74b42b3bde15062d289f2';
const categories = ['Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'];

//Launch Screen Compoment
function LaunchScreen({ navigation }) {
  const [newsData, setNewsData] = useState([]);
  const { fetchNews } = useContext(NewsContext);

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
      <Stack.Navigator 
        initialRouteName="LaunchScreen"
        screenOptions={{ 
          ...TransitionPresets.ModalSlideFromBottomIOS, // or any other preset you like
          gestureEnabled: true,
          cardOverlayEnabled: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
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
            transitionSpec: {
              open: {
                animation: 'timing',
                config: { duration: 1000, useNativeDriver: true },
              },
              close: {
                animation: 'timing',
                config: { duration: 1000, useNativeDriver: true },
              },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
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
