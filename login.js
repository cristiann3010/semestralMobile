import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, Platform, ScrollView, Animated, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração da API
const API_BASE_URL = 'http://192.168.1.7:3000'; // Mude para seu IP se testar no dispositivo físico
// Para dispositivo físico, use: 'http://SEU_IP:3000' (ex: http://192.168.1.100:3000)

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

  // Função para fazer login na API
  const handleLogin = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('🔐 Fazendo login...', { email, password: '***' });
      
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();
      console.log('📡 Resposta da API:', data);

      if (data.success) {
        // Salvar dados do usuário no AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        
        Alert.alert(
          'Sucesso!', 
          `Bem-vindo, ${data.user.nome}!`,
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('✅ Login realizado com sucesso!');
                onLoginSuccess && onLoginSuccess(data.user);
              }
            }
          ]
        );
      } else {
        Alert.alert('Erro', data.message || 'Erro ao fazer login');
      }

    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      Alert.alert(
        'Erro de Conexão', 
        'Não foi possível conectar ao servidor. Verifique se o backend está rodando.\n\nDetalhes: ' + error.message
      );
    } finally {
      setIsLoading(false);
    }
  }, [email, password, onLoginSuccess]);

  const handleForgotPassword = useCallback(() => {
    Alert.alert('Recuperação de Senha', 'Funcionalidade em desenvolvimento.');
  }, []);

  const handleRegister = useCallback(() => {
    Alert.alert('Cadastro', 'Redirecionando para tela de cadastro...');
  }, []);

  // Função para testar conexão com a API
  const testConnection = useCallback(async () => {
    try {
      console.log('🔗 Testando conexão...');
      const response = await fetch(`${API_BASE_URL}/`);
      const data = await response.json();
      Alert.alert('Teste de Conexão', `✅ Servidor conectado!\n\n${data.message}`);
    } catch (error) {
      Alert.alert('Teste de Conexão', `❌ Erro de conexão:\n${error.message}`);
    }
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
        <TouchableOpacity style={styles.testButton} onPress={testConnection} activeOpacity={0.7}>
          <Text style={styles.testButtonText}>🔗</Text>
        </TouchableOpacity>
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

          {/* Credenciais de Teste */}
          <View style={styles.credentialsContainer}>
            <Text style={styles.credentialsTitle}>📋 Credenciais de Teste:</Text>
            <Text style={styles.credentialsText}>• Admin: admin@email.com / 123456</Text>
            <Text style={styles.credentialsText}>• Funcionário: func1@email.com / func123</Text>
            <Text style={styles.credentialsText}>• Cliente: cliente1@email.com / cliente123</Text>
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
                editable={!isLoading}
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
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  style={styles.eyeButton} 
                  onPress={() => setShowPassword(!showPassword)} 
                  activeOpacity={0.7}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer} 
              onPress={handleForgotPassword} 
              activeOpacity={0.7}
              disabled={isLoading}
            >
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

            {/* Status de Conexão */}
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>
                🌐 Servidor: {API_BASE_URL}
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <AnimatedButton 
              style={styles.socialButton} 
              onPress={() => Alert.alert('Em Desenvolvimento', 'Login com Google em desenvolvimento')}
              disabled={isLoading}
            >
              <Text style={styles.socialButtonText}>📧 Continuar com Google</Text>
            </AnimatedButton>

            <AnimatedButton 
              style={styles.socialButton} 
              onPress={() => Alert.alert('Em Desenvolvimento', 'Login com Facebook em desenvolvimento')}
              disabled={isLoading}
            >
              <Text style={styles.socialButtonText}>📘 Continuar com Facebook</Text>
            </AnimatedButton>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.7} disabled={isLoading}>
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
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    paddingTop: 50, 
    backgroundColor: '#1a0f2e' 
  },
  backButton: { padding: 10, marginRight: 10 },
  backButtonText: { fontSize: 24, color: '#ffffff', fontWeight: 'bold' },
  headerTitle: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: '600', 
    color: '#ffffff', 
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center'
  },
  testButton: { padding: 10 },
  testButtonText: { fontSize: 20 },
  keyboardContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20 },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  logoImage: { width: 180, height: 80 },
  welcomeContainer: { alignItems: 'center', marginBottom: 20 },
  welcomeText: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 8, 
    fontFamily: 'Poppins-Bold' 
  },
  subtitleText: { 
    fontSize: 16, 
    color: '#cccccc', 
    fontFamily: 'Poppins-Regular' 
  },
  credentialsContainer: {
    backgroundColor: 'rgba(148, 116, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(148, 116, 255, 0.3)'
  },
  credentialsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9474FF',
    marginBottom: 8
  },
  credentialsText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 3,
    fontFamily: 'monospace'
  },
  formContainer: { flex: 1, paddingBottom: 30 },
  inputContainer: { marginBottom: 20 },
  inputLabel: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#ffffff', 
    marginBottom: 8, 
    fontFamily: 'Poppins-SemiBold' 
  },
  textInput: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    fontSize: 16, 
    color: '#ffffff', 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    fontFamily: 'Poppins-Regular' 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)' 
  },
  passwordInput: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    fontSize: 16, 
    color: '#ffffff', 
    fontFamily: 'Poppins-Regular' 
  },
  eyeButton: { paddingHorizontal: 16, paddingVertical: 14 },
  eyeIcon: { fontSize: 18 },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 30 },
  forgotPasswordText: { 
    fontSize: 14, 
    color: '#8b5cf6', 
    fontFamily: 'Poppins-Medium' 
  },
  loginButton: { 
    backgroundColor: '#6366f1', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    shadowColor: '#6366f1', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 8, 
    marginBottom: 20 
  },
  loginButtonText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#ffffff', 
    fontFamily: 'Poppins-SemiBold' 
  },
  disabledButton: { backgroundColor: '#4a4a4a', shadowOpacity: 0 },
  disabledButtonText: { color: '#888888' },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace'
  },
  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  dividerLine: { 
    flex: 1, 
    height: 1, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)' 
  },
  dividerText: { 
    marginHorizontal: 16, 
    fontSize: 14, 
    color: '#cccccc', 
    fontFamily: 'Poppins-Regular' 
  },
  socialButton: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)' 
  },
  socialButtonText: { 
    fontSize: 16, 
    color: '#ffffff', 
    fontFamily: 'Poppins-Medium' 
  },
  registerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20 
  },
  registerText: { 
    fontSize: 16, 
    color: '#cccccc', 
    fontFamily: 'Poppins-Regular' 
  },
  registerLink: { 
    fontSize: 16, 
    color: '#8b5cf6', 
    fontWeight: '600', 
    fontFamily: 'Poppins-SemiBold' 
  },
});