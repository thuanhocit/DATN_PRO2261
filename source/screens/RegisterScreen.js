import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native"

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // errors state
  const [errors, setErrors] = useState({})

  const validateInputs = () => {
    let newErrors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10,11}$/
    const passwordRegex = /^[A-Za-z0-9]{6,}$/

    if (!emailRegex.test(email)) {
      newErrors.email = "Email không hợp lệ!"
    }

    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại phải gồm 10-11 chữ số!"
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Mật khẩu ít nhất 6 ký tự, chỉ gồm chữ và số!"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp!"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validateInputs()) return

    try {
      const res = await fetch("http://10.0.2.2:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      })

      const data = await res.json()
      if (res.ok) {
        navigation.navigate("Login")
      } else {
        setErrors({ general: data.error || "Đăng ký thất bại" })
      }
    } catch (err) {
      console.error(err)
      setErrors({ general: "Không thể kết nối server" })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo_cinebook.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.formContainer}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mật khẩu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nhập lại mật khẩu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          {/* General Error */}
          {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.outlinedButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.outlinedButtonText}>Đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logo: { width: 200, height: 200 },
  formContainer: { width: "100%" },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 16, color: "#333", marginBottom: 8, fontWeight: "500" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: { color: "red", fontSize: 14, marginTop: 5 },
  registerButton: {
    backgroundColor: "#C53030",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  registerButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", letterSpacing: 1 },
  dividerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#ccc" },
  dividerText: { marginHorizontal: 15, color: "#666", fontSize: 16, fontStyle: "italic" },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  outlinedButtonText: { color: "#666", fontSize: 16, fontWeight: "500" },
})

export default RegisterScreen
