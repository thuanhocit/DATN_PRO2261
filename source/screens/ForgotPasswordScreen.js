import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from "react-native"

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email của bạn")
      return
    }

    // Regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Địa chỉ email không hợp lệ")
      return
    }

    // Xử lý logic reset password
    console.log("Reset password for:", email)
    Alert.alert("Thành công", "Chúng tôi đã gửi link reset mật khẩu đến email của bạn", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ])
  }

  const handleBackToLogin = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo_cinebook.png")} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Quên mật khẩu?</Text>
        <Text style={styles.subtitle}>Nhập email của bạn và chúng tôi sẽ gửi link để reset mật khẩu</Text>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập email của bạn"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Reset Button */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>GỬI LINK RESET</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
            <Text style={styles.backButtonText}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  resetButton: {
    backgroundColor: "#C53030",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  backButton: {
    alignSelf: "center",
  },
  backButtonText: {
    color: "#1E90FF",
    fontSize: 16,
    fontStyle: "italic",
  },
})

export default ForgotPasswordScreen
