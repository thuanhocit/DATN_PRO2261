import { Video } from 'expo-av';
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MovieDetails = ({ route, navigation }) => {
  const { movie } = route.params;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync(); // Tự động phát video khi vào màn hình chi tiết phim
    }

    const unsubscribe = navigation.addListener('blur', () => {
      if (videoRef.current) {
        videoRef.current.stopAsync(); // Dừng video khi quay lại hoặc chuyển màn hình
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/videos/muado.mp4')} // Sử dụng video cục bộ
        style={styles.trailer}
        useNativeControls
        resizeMode="cover"
      />
      <View style={styles.topSection}>
        <Image source={movie.image} style={styles.movieImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.movieDetails}>Thời lượng: {movie.duration}</Text>
          <Text style={styles.movieDetails}>Ngày khởi chiếu: {movie.releaseDate}</Text>
          <Text style={styles.movieDetails}>Thể loại: {movie.genre}</Text>
        </View>
      </View>
      <Text style={styles.movieDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisi id libero tincidunt tincidunt. Suspendisse potenti.</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  trailer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  movieImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginRight: 10, // Adjusted spacing between image and details
  },
  detailsContainer: {
    flex: 1,
  },
  movieDetails: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MovieDetails;
