import * as React from 'react';
import { View, StyleSheet, Image, Text, Button, Pressable } from 'react-native';
import LittleLemonLogo from '../assets/little-lemon-logo.png';
import sublogo from '../assets/subscribe-button.png';

/**
 * Represents the welcome screen for the Little Lemon restaurant app.
 * 
 * This screen displays the Little Lemon logo and a welcome message.
 * It includes a pressable button that navigates the user to the subscription screen.
 *
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object used for navigating between screens.
 */
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.contentContainer}>
        <Image 
          style = {styles.logo} 
          source={LittleLemonLogo}/>
        <Text style = {styles.title}>Little Lemon, your local Mediterrian restaurant</Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Subscribe");
        }}
        style = {styles.buttonStyle}
        title='Newsletter'>
        <Image
          style={styles.buttonImage}
          source={sublogo}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 320,
    backgroundColor: "#495E57",
    borderRadius: 12,
  },
  buttonImage: {
    height: 40,
    width: 320,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  title: {
    marginTop: 48,
    paddingVertical: 10,
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    width: 300,
  },
});

export default WelcomeScreen;
