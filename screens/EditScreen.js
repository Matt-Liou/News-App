import * as React from 'react';
import { View, StyleSheet, Image, Text, TextInput, Pressable, Alert, ScrollView} from 'react-native';
import { useContext } from 'react';
import LittleLemonLogo from '../assets/little-lemon-logo-grey.png';
import Subscription from '../components/Subscription';
import SubData from '../subscrition_data/SubData';

const EditScreen = () => {
    const {subEmail} = useContext(SubData);
    // const testList = ["ydliou2003@gmail.com", "utliou2005@gmail.com", "test@gmail.com"]


    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Edit Subscription</Text>
                <Text style={styles.smallTitle}>Manage all of your newspaper subscription</Text>
            </View>
            <ScrollView>
                {subEmail.length === 0 ? (
                    <View style={styles.noSubscriptions}>
                        <Text style={styles.noSubscriptionsText}>No newsletter subscriptions</Text>
                    </View>
                ) : (
                    <View style={styles.smallContainer}>
                        {subEmail.map((item, index) => (
                            <Subscription key={index} emailIndex={index} text={item}/>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "white",
    },
    titleContainer: {
        marginTop: 10,
        marginBottom: -10,
    },
    title: {
      color: "black",
      fontSize: 24,
      fontWeight: "bold",
    },
    smallTitle: {
        color: 'rgba(0, 0, 0, 0.7)',
        paddingBottom: 30
    },
    smallContainer: {
        padding: 10,
    },
    noSubscriptions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSubscriptionsText: {
        fontSize: 15,
        color: '#555',
    },
});

export default EditScreen;