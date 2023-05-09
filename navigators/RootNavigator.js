import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import NewsApp from "../screens/NewsApp";
import SubscribeNavigator from "./SubscribeNavigator";
import { DataProvider } from "../subscrition_data/SubData";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <DataProvider>
      <Stack.Navigator initialRouteName="NewsFeed">
        <Stack.Screen
          name="NewsFeed"
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
