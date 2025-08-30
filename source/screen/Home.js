import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const { width } = Dimensions.get('window');

const movies = [
  { id: '1', title: 'Avengers: Endgame', image: require('../../assets/image.png') },
  { id: '2', title: 'Spider-Man: No Way Home', image: require('../../assets/image.png') },
  { id: '3', title: 'The Batman', image: require('../../assets/image.png') },
  { id: '4', title: 'Joker', image: require('../../assets/image.png') },
  { id: '5', title: 'Black Panther', image: require('../../assets/image.png') },
  { id: '6', title: 'Doctor Strange', image: require('../../assets/image.png') },
];

const banners = [
  { id: 'b1', image: require('../../assets/icon.png') },
  { id: 'b2', image: require('../../assets/image.png') },
  { id: 'b3', image: require('../../assets/image.png') },
];

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (activeIndex + 1) % banners.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setActiveIndex(nextIndex);
      }
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderMovie = ({ item }) => (
    <TouchableOpacity style={styles.movieCard} onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
      <Image source={item.image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderBanner = ({ item }) => (
    <Image source={item.image} style={styles.bannerImage} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountIcon} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Banner carousel */}
      <View>
        <FlatList
          data={banners}
          renderItem={renderBanner}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
        />
        {/* Dots indicator */}
        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === activeIndex ? '#333' : '#ccc' },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Movie list */}
      <FlatList
        data={filteredMovies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIcon: {
    padding: 5,
  },
  accountIcon: {
    padding: 5,
  },
  bannerImage: {
    width: width - 20,
    height: 180,
    borderRadius: 12,
    marginRight: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  movieList: {
    paddingBottom: 20,
  },
  movieCard: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
});

export default Home;
