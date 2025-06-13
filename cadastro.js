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

export default function CadastroScreen({ onNavigateBack, onNavigateToLogin, onRegisterSuccess }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


const handleRegister = useCallback(async () => {
  if (!nome.trim() || !email.trim() || !password.trim()) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  if (password.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um email válido.');
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('http://10.0.2.2:3000/register', {
      // IMPORTANTE: Use 10.0.2.2 no emulador Android para acessar localhost do PC
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nome.trim(),
        email: email.trim(),
        senha: password.trim(), // <-- o backend espera "senha", não "password"
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'Cadastro realizado com sucesso!');
      onRegisterSuccess && onRegisterSuccess();
    } else {
      alert(data.error || 'Erro ao cadastrar.');
    }
  } catch (error) {
    alert('Erro na conexão com o servidor.');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}, [nome, email, password, onRegisterSuccess]);





  const isFormValid = nome.trim() && email.trim() && password.trim() && !isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro</Text>
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
            <Text style={styles.welcomeText}>Criar nova conta</Text>
            <Text style={styles.subtitleText}>Preencha os dados para se cadastrar</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Nome Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome Completo *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#666"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email *</Text>
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
              <Text style={styles.inputLabel}>Senha *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Digite sua senha (min. 6 caracteres)"
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

            
            

            {/* Register Button */}
            <AnimatedButton 
              style={[styles.registerButton, !isFormValid && styles.disabledButton]} 
              onPress={handleRegister} 
              disabled={!isFormValid}
            >
              <Text style={[styles.registerButtonText, !isFormValid && styles.disabledButtonText]}>
                {isLoading ? 'Cadastrando...' : 'Criar Conta'}
              </Text>
            </AnimatedButton>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Register Buttons */}
            <AnimatedButton style={styles.socialButton} onPress={() => alert('Cadastro com Google em desenvolvimento')}>
              <Text style={styles.socialButtonText}>📧 Cadastrar com Google</Text>
            </AnimatedButton>

            <AnimatedButton style={styles.socialButton} onPress={() => alert('Cadastro com Facebook em desenvolvimento')}>
              <Text style={styles.socialButtonText}>📘 Cadastrar com Facebook</Text>
            </AnimatedButton>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
                <Text style={styles.loginLink}>Faça login</Text>
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
  backButtonText: { fontSize: 24, color: '#ffff', fontWeight: 'bold' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#ffffff', fontFamily: 'Poppins-SemiBold' },
  headerSpacer: { flex: 1 },
  keyboardContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20 },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  logoImage: { width: 180, height: 80 },
  welcomeContainer: { alignItems: 'center', marginBottom: 30 },
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
  registerButton: { backgroundColor: '#6366f1', paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, marginBottom: 30 },
  registerButtonText: { fontSize: 18, fontWeight: '600', color: '#ffffff', fontFamily: 'Poppins-SemiBold' },
  disabledButton: { backgroundColor: '#4a4a4a', shadowOpacity: 0 },
  disabledButtonText: { color: '#888888' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  dividerText: { marginHorizontal: 16, fontSize: 14, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  socialButton: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  socialButtonText: { fontSize: 16, color: '#ffffff', fontFamily: 'Poppins-Medium' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  loginText: { fontSize: 16, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  loginLink: { fontSize: 16, color: '#8b5cf6', fontWeight: '600', fontFamily: 'Poppins-SemiBold' },
});