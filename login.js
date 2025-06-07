import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, Platform, ScrollView, Animated, Pressable } from 'react-native';

// Componente de botão animado
const AnimatedButton = ({ style, children, onPress, disabled = false }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true, tension: 150, friction: 8 }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, tension: 150, friction: 8 }).start();
    }
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} disabled={disabled} style={[style, disabled && styles.disabledButton]}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>{children}</Animated.View>
    </Pressable>
  );
};

export default function LoginScreen({ onNavigateBack, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    
    // Simulação de autenticação
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@augebit.com' && password === '123456') {
        alert('Login realizado com sucesso!');
        onLoginSuccess && onLoginSuccess();
      } else {
        alert('Email ou senha incorretos.');
      }
    }, 1500);
  }, [email, password, onLoginSuccess]);

  const handleForgotPassword = useCallback(() => {
    alert('Funcionalidade de recuperação de senha em desenvolvimento.');
  }, []);

  const handleRegister = useCallback(() => {
    alert('Redirecionando para tela de cadastro...');
  }, []);

  const isFormValid = email.trim() && password.trim() && !isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('./img/logo-removebg-preview 2.png')} style={styles.logoImage} resizeMode="contain" />
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitleText}>Faça login para continuar</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <AnimatedButton 
              style={[styles.loginButton, !isFormValid && styles.disabledButton]} 
              onPress={handleLogin} 
              disabled={!isFormValid}
            >
              <Text style={[styles.loginButtonText, !isFormValid && styles.disabledButtonText]}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Text>
            </AnimatedButton>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <AnimatedButton style={styles.socialButton} onPress={() => alert('Login com Google em desenvolvimento')}>
              <Text style={styles.socialButtonText}>📧 Continuar com Google</Text>
            </AnimatedButton>

            <AnimatedButton style={styles.socialButton} onPress={() => alert('Login com Facebook em desenvolvimento')}>
              <Text style={styles.socialButtonText}>📘 Continuar com Facebook</Text>
            </AnimatedButton>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                <Text style={styles.registerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0f2e' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, paddingTop: 50, backgroundColor: '#1a0f2e' },
  backButton: { padding: 10, marginRight: 10 },
  backButtonText: { fontSize: 24, color: '#ffffff', fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#ffffff', fontFamily: 'Poppins-SemiBold' },
  headerSpacer: { flex: 1 },
  keyboardContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20 },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  logoImage: { width: 180, height: 80 },
  welcomeContainer: { alignItems: 'center', marginBottom: 40 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 8, fontFamily: 'Poppins-Bold' },
  subtitleText: { fontSize: 16, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  formContainer: { flex: 1, paddingBottom: 30 },
  inputContainer: { marginBottom: 20 },
  inputLabel: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 8, fontFamily: 'Poppins-SemiBold' },
  textInput: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#ffffff', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', fontFamily: 'Poppins-Regular' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  passwordInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#ffffff', fontFamily: 'Poppins-Regular' },
  eyeButton: { paddingHorizontal: 16, paddingVertical: 14 },
  eyeIcon: { fontSize: 18 },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 30 },
  forgotPasswordText: { fontSize: 14, color: '#8b5cf6', fontFamily: 'Poppins-Medium' },
  loginButton: { backgroundColor: '#6366f1', paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, marginBottom: 30 },
  loginButtonText: { fontSize: 18, fontWeight: '600', color: '#ffffff', fontFamily: 'Poppins-SemiBold' },
  disabledButton: { backgroundColor: '#4a4a4a', shadowOpacity: 0 },
  disabledButtonText: { color: '#888888' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  dividerText: { marginHorizontal: 16, fontSize: 14, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  socialButton: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  socialButtonText: { fontSize: 16, color: '#ffffff', fontFamily: 'Poppins-Medium' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  registerText: { fontSize: 16, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  registerLink: { fontSize: 16, color: '#8b5cf6', fontWeight: '600', fontFamily: 'Poppins-SemiBold' },
});