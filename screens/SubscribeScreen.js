import * as React from 'react';
import { View, StyleSheet, Image, Text, TextInput, Pressable, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LittleLemonLogo from '../assets/little-lemon-logo-grey.png';
import newsLogo from '../assets/icons8-news-420.png';
import SubData from '../datas/SubData';
import { useContext } from 'react';

//Icon Hex Code: #FF8C00

/**
 * Represents the subscription screen for the NewsNest app.
 * 
 * This screen is designed for users to subscribe to the NewsNest newsletter.
 * It features the NewsNest logo and a prompt encouraging users to stay updated with the latest news and lifestyle trends.
 * Users can subscribe by entering their email address in the provided text input field. 
 * Upon pressing the subscribe button, the email is added to the subscription list, and a thank you alert is displayed.
 *
 * This screen also includes functionality to dismiss the keyboard when tapping outside the text input field.
 */
const SubscribeScreen = () => {
  const [email, setEmail] = React.useState('')
  const { addEmail } = useContext(SubData);

  /**
   * Adds the user's email to the subscription list.
   * Clears the email state after adding the email.
   * Only triggers if the email is not an empty string.
   */
  const handleAddEmail = () => {
    if (email !== '') {
      addEmail(email)
      setEmail('');
    }
  }

  /**
   * Dismisses the keyboard when the user taps outside the text input.
   * This improves the usability of the screen on mobile devices.
   */
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} >
      <View style={styles.container}>
        <Image 
          style={styles.logo}
          source={newsLogo}
        />
        <Text style={styles.title}>
        Subscribe to our newsletter for the latest news and lifestyle trends!
        </Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize='none'
          placeholder={"Type your email"}
        />
        <Pressable
          style={styles.buttonStyle}
          onPress={() => {
            handleAddEmail();
            Alert.alert("Thanks for subscribing, stay tuned!");
          }}
        >
          <Text style={styles.buttonText}>Subscribe</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 320,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -80,
  },
  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 32,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginBottom: 32,
  },
  input: {
    height: 40,
    width: 320,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
});


export default SubscribeScreen;
