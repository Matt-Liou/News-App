import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { StatusBar } from 'react-native';
import { NewsProvider } from "./datas/NewsContext";

// App.js is already setup by wrapping NavigationContainer around Root Navigator
export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NewsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NewsProvider>
    </>
  );
}