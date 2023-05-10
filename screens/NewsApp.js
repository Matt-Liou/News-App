import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import sublogo from '../assets/subscribe-button.png';
import smallLogo from '../assets/icons8-news-48.png';
import { Chip } from 'react-native-paper';
import { Modal } from 'react-native';

const categories = ["Technology", "Sports", "Politices", "Health", "Business"];
const API_KEY = "pub_2188514dfd53a38c8315c5f3ed849ff912a6a";
//https://newsdata.io/api/1/news?apikey=pub_2188514dfd53a38c8315c5f3ed849ff912a6a 

const NewsApp = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [animation] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);


  const getCurrentDate = () => {
    const date = new Date();
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.getDate();
  
    return `${day}, ${month} ${dayOfMonth}`;
  };
  
  

  const handleSelect = (val: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.find((p) => p === val) 
      ? prev.filter((cat) => cat !== val)
      : [...prev, val]
    );
  }

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=f4d9c81e82e74b42b3bde15062d289f2')
      .then(response => response.json())
      .then(data => setNews(data.articles))
      .catch(error => console.error(error));
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };    
  
  const renderArticle = ({ item }) => {

    const handlePress = () => {
      setSelectedArticle(item);
      setModalVisible(true);
    };    

    return (
      <Pressable style={styles.article} onPress={handlePress}>
        <Image style={styles.image} source={{ uri: item.urlToImage }} />
        <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
        {/* <Text numberOfLines={4} style={styles.description}>{item.description}</Text> */}
      </Pressable>
    );
  };

  const handlePress = () => {
    Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate("Subscribe");
      });
  }

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            {selectedArticle && (
              <>
                <Image style={styles.modalImage} source={{ uri: selectedArticle.urlToImage }} />
                <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                <Text style={styles.modalDescription}>{selectedArticle.description}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
      <View style={styles.newsContainer}>
        <View>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
          <Text style={styles.latestNewsText}>Trending 🔥</Text>
        </View>
      </View>
      <View>
      <FlatList
        data={news}
        horizontal={true}
        renderItem={renderArticle}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.list}
        flexGrow={1}
        showsHorizontalScrollIndicator={false}
      />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {categories.map((cat) => (
            <Chip 
              key={cat}
              mode='outlined'
              style={styles.chipItem}
              textStyle={{fontWeight: '400', color:"black", padding: 1}}
              showSelectedOverlay
              selected={selectedCategories.find((c) => cat === c) ? true : false}
              onPress={() => handleSelect(cat)}
            >
              {cat}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image
          style={styles.buttonImage}
          source={sublogo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  smallLogo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  newsContainer: {
    paddingLeft: 25,
    marginTop: 55,
    marginBottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  latestNewsText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  categoriesContainer: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  categoriesText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: -10,
  },
  buttonImage: {
    height: 40,
    width: 320,
    resizeMode: 'contain',
  },
  article: {
    marginHorizontal: 10,
    flex: 1,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: 180,
    width: 230,
  },
  list: {
    paddingHorizontal: 10,
  },
  image: {
    height: 100,
    borderRadius: 10,
    width: 200,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    width: 200,
  },
  description: {
    marginTop: 5,
    lineHeight: 20,
    width: 200,
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    height: 70,
    width: 70,
    borderRadius: 50,
    elevation: 10, // Increase elevation for a stronger shadow effect on Android
    shadowColor: '#000', // Add shadow color for iOS
    shadowOffset: { width: 0, height: 5 }, // Add shadow offset for iOS
    shadowOpacity: 0.3, // Add shadow opacity for iOS
    shadowRadius: 5, // Add shadow radius for iOS
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 350,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    marginTop: -20,
    marginRight: -10,
  },
  modalImage: {
    height: 200,
    borderRadius: 10,
    width: 300,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 300,
    textAlign: 'left',
  },
  modalDescription: {
    marginBottom: -10,
    lineHeight: 20,
    width: 300,
    textAlign: 'left',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  dateText: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 0,
    opacity: 0.5,
  },
});  

export default NewsApp;
