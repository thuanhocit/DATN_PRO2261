import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"  // để điều hướng

const LoginScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      const res = await fetch("http://10.0.2.2:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()
      if (res.ok) {
        console.log("Login successful:", data)
        // TODO: Lưu token vào AsyncStorage hoặc Redux ở đây
      } else {
        alert(data.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword")   // tên screen trong App.js
  }

  const handleCreateAccount = () => {
    navigation.navigate("Register")         // tên screen trong App.js
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo_cinebook.png")} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email hoặc số điện thoại Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email hoặc số điện thoại</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email hoặc số điện thoại"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.outlinedButton} onPress={handleCreateAccount}>
            <Text style={styles.outlinedButtonText}>Đăng ký tài khoản Cinebook</Text>
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
    width: 200,
    height: 200,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: "#C53030",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  forgotPasswordContainer: {
    alignSelf: "center",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#1E90FF",
    fontSize: 16,
    fontStyle: "italic",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#666",
    fontSize: 16,
    fontStyle: "italic",
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  outlinedButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default LoginScreen;
