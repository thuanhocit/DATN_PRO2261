import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native"
import { useNavigation } from "@react-navigation/native" // để điều hướng

const LoginScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberAccount, setRememberAccount] = useState(false)
  const [errorUsername, setErrorUsername] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const navigation = useNavigation()

  const handleLogin = async () => {
    let valid = true
    setErrorUsername("")
    setErrorPassword("")

    if (!username.trim()) {
      setErrorUsername("Vui lòng nhập email hoặc số điện thoại")
      valid = false
    }
    if (!password.trim()) {
      setErrorPassword("Vui lòng nhập mật khẩu")
      valid = false
    }

    if (!valid) return

    try {
      const res = await fetch("http://10.0.2.2:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()
      if (res.ok) {
        console.log("Login successful:", data)
        if (rememberAccount) {
          console.log("Saving account info for next login")
        }
      } else {
        setErrorPassword(data.error || "Sai tài khoản hoặc mật khẩu")
      }
    } catch (err) {
      console.error(err)
      setErrorPassword("Không thể kết nối đến server")
    }
  }

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword")
  }

  const handleCreateAccount = () => {
    navigation.navigate("Register")
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
              style={[styles.textInput, errorUsername ? styles.inputError : null]}
              placeholder="Email hoặc số điện thoại"
              value={username}
              onChangeText={(text) => {
                setUsername(text)
                if (text.trim()) setErrorUsername("")
              }}
              autoCapitalize="none"
            />
            {errorUsername ? <Text style={styles.errorText}>{errorUsername}</Text> : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <TextInput
              style={[styles.textInput, errorPassword ? styles.inputError : null]}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                if (text.trim()) setErrorPassword("")
              }}
              secureTextEntry
            />
            {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
          </View>

          {/* Remember account checkbox */}
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberAccount(!rememberAccount)}>
            <View style={[styles.checkbox, rememberAccount && styles.checkboxChecked]}>
              {rememberAccount && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Nhớ tài khoản</Text>
          </TouchableOpacity>

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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 5,
    color: "red",
    fontSize: 14,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#C53030",
    borderColor: "#C53030",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
})

export default LoginScreen
