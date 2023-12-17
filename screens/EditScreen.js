import * as React from 'react';
import { View, StyleSheet, Image, Text, TextInput, Pressable, Alert, ScrollView} from 'react-native';
import { useContext } from 'react';
import Subscription from '../components/Subscription';
import SubData from '../datas/SubData';

/**
 * Represents the subscription editing screen of the application.
 * 
 * This screen allows users to manage their newsletter subscriptions. It displays a list of current subscriptions,
 * allowing users to edit or delete them as needed. The list of subscriptions is fetched from the SubData context.
 * If there are no subscriptions, a message indicating 'No newsletter subscriptions' is displayed.
 */
const EditScreen = () => {
    const {subEmail} = useContext(SubData);

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