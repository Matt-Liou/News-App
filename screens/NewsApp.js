import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import sublogo from '../assets/subscribe-button.png';
import smallLogo from '../assets/icons8-news-48.png';
import { Chip, Button } from 'react-native-paper';
import { Modal } from 'react-native';

const API_KEY = 'f4d9c81e82e74b42b3bde15062d289f2';
const categories = ['Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'];

const NewsApp = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [animation] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Business');
  const [newsData, setNewsData] = useState([]);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.getDate();
  
    return `${day}, ${month} ${dayOfMonth}`;
  };

  const fetchNews = async (category) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );
      const responseJson = await response.json();
      setNewsData(responseJson.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.newsItem}>
      <Text style={styles.title2}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
  
  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

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

  const emptyIcon = () => null

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
      {/* News screen view starting here */}
      <View style={styles.newsContainer}>
        <View>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
          <Text style={styles.latestNewsText}>Trending🔥</Text>
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
          {categories.map((category) => (
            <Chip
              icon={emptyIcon}
              key={category}
              mode='outlined'
              selected={category === selectedCategory}
              textStyle={{fontWeight: '400', color:"black", padding: 1}}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.chipItem,
                category === selectedCategory && {  backgroundColor: '#1E90FF22' },
              ]}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />  
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
    fontSize: 40,
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
  imageContainer:  {
    flex: 1,
    position: 'relative'
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
    width: 330,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    opacity: 0.5,
    marginTop: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  newsItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
});  

export default NewsApp;
