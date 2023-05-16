import React, { useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable, TouchableOpacity, Animated, ScrollView, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import sublogo from '../assets/mail.png';
import smallLogo from '../assets/icons8-news-48.png';
import { Chip, Button } from 'react-native-paper';
import { Modal } from 'react-native';
import moment from 'moment';
import {LinearGradient} from 'expo-linear-gradient';
import { NewsContext } from '../datas/NewsContext';

const API_KEY = 'f4d9c81e82e74b42b3bde15062d289f2';
const categories = ['Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'];

const NewsApp = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [animation] = useState(new Animated.Value(1));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Business');
  // const [newsData, setNewsData] = useState([]);
  const { newsData, fetchNews } = useContext(NewsContext);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.getDate();
  
    return `${day}, ${month} ${dayOfMonth}`;
  };

  

  // const fetchNews = async (category) => {
  //   try {
  //     const response = await fetch(
  //       `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  //     );
  //     const responseJson = await response.json();
  //     setNewsData(responseJson.articles);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const renderItem = ({item}) => {

    const handlePress = () => {
      setSelectedArticle(item);
      setModalVisible(true);
    };    
    
    return (
      <Pressable onPress={handlePress}>
        <View style={styles.newsItem}>
          <View style={styles.catoImageView}>
            <Image style={styles.catoImage} source={{ uri: item.urlToImage }} />
          </View>
          <View style={styles.catoRight}>
            <Text numberOfLines={3} style={styles.title2}>{item.title}</Text>
            <View style={styles.publishInfo}>
              <Text style={styles.publisher}>{item.source.name} - </Text>
              <Text style={styles.publisher}>{moment(item.publishedAt).fromNow()}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  const renderArticle = ({ item }) => {

    const handlePress = () => {
      setSelectedArticle(item);
      setModalVisible(true);
    };    

    return (
      <Pressable style={styles.article} onPress={handlePress}>
        <View styles={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.urlToImage }} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.category}>Hot🔥</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  
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

  const handlePress = () => {
    Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate("Subscribe");
      });
  }

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
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Ionicons name="return-up-back-outline" size={24} color="black" />
                  <Text>  Return</Text>
                </View>
              </TouchableOpacity>
              {selectedArticle && (
                <>
                  <Image style={styles.modalImage} source={{ uri: selectedArticle.urlToImage }} />
                  <View style={styles.modalTextView}>
                    <ScrollView>
                      <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
                      <View style={{flexDirection: 'row', width: 360}}>
                        <Text style={styles.modalPublishInfo}>
                          {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: '2-digit'})} by
                        </Text>
                        <Text style={styles.modalPublishInfo2}> {selectedArticle.author}</Text>
                      </View>
                      <Text style={styles.modalDescription}>{selectedArticle.content}</Text>
                      </ScrollView>
                  </View>
                  <TouchableOpacity style={styles.openButton} onPress={() => Linking.openURL(selectedArticle.url)}>
                      <Text style={styles.openButtonText}>Read Full Article</Text>
                  </TouchableOpacity>
                </>
              )}
          </View>
        </View>
      </Modal>
      {/* News screen view starting here */}
      <View style={styles.newsContainer}>
        <View>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
          <Text style={styles.latestNewsText}>Trending</Text>
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
              selected={category === selectedCategory}
              textStyle={{fontWeight: '400', color: category === selectedCategory ? "white" : "black", padding: 3}}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.chipItem,
                { backgroundColor: category === selectedCategory ? "#1E90FF" : "rgba(0, 0, 0, 0.05)", borderRadius: 20 },
              ]}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <View>
        <FlatList
            data={newsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> 
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
  category: {
    color: 'black',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  categoryTextContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 30,
    width: 70,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5,
  },
  container: {
    flex: 1,
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
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,
    elevation: 3,
    height: 200,
    width: 280,
  },
  list: {
    paddingHorizontal: 10,
  },
  image: {
    height: 200,
    borderRadius: 20,
    width: 280,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    width: 280,
    position: 'absolute',
    color: 'white',
    bottom: 0,
    padding: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5,
  },
  imageContainer:  {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
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
    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 5,
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  modalImage: {
    height: 500,
    width: 400,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 360,
    textAlign: 'left',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  modalPublishInfo: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 20,
    paddingLeft: 30,
  },
  modalPublishInfo2: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Optima-BoldItalic',
  },
  modalTextView: {
    position: 'absolute',
    top: 350,
    backgroundColor: 'white',
    flex: 1,
    right: 0,
    left: 0,
    bottom: 0,
    marginTop: 10,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 5,
  },
  modalDescription: {
    marginBottom: -10,
    lineHeight: 20,
    width: 360,
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 19,
    paddingHorizontal: 10,
    color: 'rgba(0, 0, 0, 0.9)',
    fontFamily: 'Avenir',
  },
  openButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    padding: 10,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 25,
    alignItems: 'center',
    width: 200,
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    marginVertical: 10,
    marginLeft: 14,
    marginTop: 20,
    marginBottom: -5,
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
    paddingHorizontal: 10,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems:'center',
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    width: 260,
  },
  description: {
    fontSize: 14,
  },
  catoImage: {
    height: 90,
    width: 90,
    borderRadius: 8,
  },
  catoImageView: {
    padding: 10,
  },
  publishInfo: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  publisher: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  catoRight: {
    height: 90,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: 20,
  },
});  

export default NewsApp;
