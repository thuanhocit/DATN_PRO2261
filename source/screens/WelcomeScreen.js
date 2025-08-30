import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const logoScale = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleGetStarted = () => {
    navigation.navigate("Login")
    console.log("Go to Login")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image source={require("../../assets/logo_cinebook.png")} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        {/* Welcome Content */}
        <Animated.View
          style={[
            styles.welcomeContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.welcomeTitle}>Welcome to Cinebook</Text>
          <Text style={styles.welcomeSubtitle}>
            Discover and book your favorite movies with ease. Experience cinema like never before.
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🎬</Text>
              </View>
              <Text style={styles.featureText}>Browse Movies</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🎫</Text>
              </View>
              <Text style={styles.featureText}>Book Tickets</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>⭐</Text>
              </View>
              <Text style={styles.featureText}>Rate & Review</Text>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Section */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>

          {/* <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View> */}
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    width: 200,
    height: 200,
  },
  welcomeContent: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  featureItem: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  bottomSection: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: "#FF3B30",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  activeIndicator: {
    backgroundColor: "#FF3B30",
    width: 24,
  },
})

export default WelcomeScreen
