import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import SubData from '../subscrition_data/SubData';

const Subscription = (props) => {
  const { removeEmail } = useContext(SubData);
  const [animation] = useState(new Animated.Value(1));

  const handleRemoveSubscription = () => {
    // console.log("Removing subscription with index:", props.emailIndex);
    // Animated.timing(animation, {
    //   toValue: 0,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start(() => {
    //   removeEmail(props.emailIndex);
    // });
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
