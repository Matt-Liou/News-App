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

/**
 * Represents the launch screen of the NewsNest app.
 *
 * This screen displays the app's logo and a loading indicator. After a brief delay, it automatically
 * navigates to the main NewsApp screen. This is used as an initial loading or splash screen.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object used for navigating between screens.
 * @returns {React.Component} The LaunchScreen component.
 */
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

/**
 * RootNavigator component for the NewsNest app.
 *
 * This component is responsible for defining the navigation stack of the application.
 * It uses `createNativeStackNavigator` from React Navigation to manage the navigation flow.
 * The RootNavigator includes three primary screens:
 * - LaunchScreen: A splash screen that displays the app's logo and a loading indicator.
 * - NewsApp: The main screen of the app, showing the latest news articles.
 * - SubscribeNavigator: A navigator handling the subscription flow.
 *
 * The navigation transitions and styles are defined in the screenOptions property.
 *
 * @component
 * @returns {React.Component} The RootNavigator component with the defined navigation stack.
 */
const RootNavigator = () => {
  return (
    <DataProvider>
      <Stack.Navigator 
        initialRouteName="LaunchScreen"
        screenOptions={{ 
          ...TransitionPresets.ModalSlideFromBottomIOS,
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
          }}
        />
      </Stack.Navigator>
    </DataProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
