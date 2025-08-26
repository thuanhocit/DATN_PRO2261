import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/96/000000/add-user-group-man-man.png' }}
            style={styles.avatar}
          />
          <Text style={styles.title}>Đăng ký</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="account" size={22} color="#0288D1" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Họ tên"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="email" size={22} color="#0288D1" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={22} color="#0288D1" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={22} color="#0288D1" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={22} color="#aaa" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock-check" size={22} color="#0288D1" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={!showConfirm}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Icon name={showConfirm ? "eye-off" : "eye"} size={22} color="#aaa" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4FC3F7', // màu nền xanh tươi
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288D1', // màu chữ xanh tươi
    marginBottom: 8,
  },
  form: {
    width: 90,
    maxWidth: 340,
    minWidth: 280,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#0288D1', // màu bóng xanh tươi
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD', // nền input xanh nhạt
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#4FC3F7', // viền xanh tươi
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#222',
  },
  button: {
    backgroundColor: '#0288D1', // màu nút xanh tươi
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0288D1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
