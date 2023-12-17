import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import SubData from '../datas/SubData';

/**
 * Subscription component for displaying individual subscription items.
 * 
 * This component is used to display a single subscription email address within a list. It includes functionality
 * to remove the email from the subscription list using a context-provided function. The component also features
 * an animation effect for the displayed items.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.emailIndex - The index of the email in the subscription list
 * @param {string} props.text - The email address to be displayed
 * 
 * @returns {React.Component} A component representing a single subscription item with remove functionality.
 */
const Subscription = (props) => {
  const { removeEmail } = useContext(SubData);
  const [animation] = useState(new Animated.Value(1));

  const handleRemoveSubscription = () => {
    removeEmail(props.emailIndex);
  };
  

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <View style={styles.itemLeft}>
        <View style={{ flex: 1 }}>
          <Text>{props.text}</Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveSubscription}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#90CAF91A',
    padding: 15,
    // f2f2f2
    borderRadius: 10,
    alignItems: 'left',
    justifyContent: 'space-between',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemRight: {
    flexDirection: 'row-reverse',
  },
  removeButton: {
    backgroundColor: '#ff0000',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
  },
});

export default Subscription;
