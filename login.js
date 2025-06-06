import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ContatosScreen = ({ onNavigateBack }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validação básica
    if (!formData.nome || !formData.email || !formData.mensagem) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios (Nome, Email e Mensagem).');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    Alert.alert(
      'Sucesso', 
      'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.',
      [
        { text: 'OK', onPress: () => {
          setFormData({
            nome: '',
            email: '',
            telefone: '',
            assunto: '',
            mensagem: ''
          });
        }}
      ]
    );
  };

  const contactInfoData = [
    {
      id: 1,
      icon: '📞',
      title: 'Telefone',
      info: '+55 (047) 0000-0000',
      description: 'Segunda a Sexta, 8h às 18h'
    },
    {
      id: 2,
      icon: '✉️',
      title: 'Email',
      info: 'augebit.10@gmail.com',
      description: 'Resposta em até 24h'
    },
    {
      id: 3,
      icon: '📍',
      title: 'Endereço',
      info: 'Rua Exemplo, 123',
      description: 'Centro - Cidade, SC'
    },
    {
      id: 4,
      icon: '🕐',
      title: 'Horário',
      info: 'Seg - Sex: 8h às 18h',
      description: 'Sáb: 8h às 12h'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onNavigateBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CONTATOS</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View 
            style={[
              styles.content, 
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Seção de Informações de Contato */}
            <View style={styles.contactInfoSection}>
              <Text style={styles.sectionTitle}>Entre em Contato</Text>
              <Text style={styles.sectionSubtitle}>
                Estamos aqui para ajudar você. Entre em contato conosco através dos canais abaixo.
              </Text>
              
              <View style={styles.contactCardsContainer}>
                {contactInfoData.map((contact) => (
                  <View key={contact.id} style={styles.contactCard}>
                    <View style={styles.contactCardHeader}>
                      <Text style={styles.contactIcon}>{contact.icon}</Text>
                      <Text style={styles.contactTitle}>{contact.title}</Text>
                    </View>
                    <Text style={styles.contactInfo}>{contact.info}</Text>
                    <Text style={styles.contactDescription}>{contact.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Formulário de Contato */}
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Envie uma Mensagem</Text>
              
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nome *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Seu nome completo"
                    placeholderTextColor="#999"
                    value={formData.nome}
                    onChangeText={(text) => handleInputChange('nome', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="seu.email@exemplo.com"
                    placeholderTextColor="#999"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Telefone</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#999"
                    value={formData.telefone}
                    onChangeText={(text) => handleInputChange('telefone', text)}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Assunto</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Sobre o que você gostaria de falar?"
                    placeholderTextColor="#999"
                    value={formData.assunto}
                    onChangeText={(text) => handleInputChange('assunto', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mensagem *</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Escreva sua mensagem aqui..."
                    placeholderTextColor="#999"
                    value={formData.mensagem}
                    onChangeText={(text) => handleInputChange('mensagem', text)}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <Text style={styles.requiredNote}>* Campos obrigatórios</Text>

                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0f2e',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: '#1a0f2e',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contactInfoSection: {
    marginTop: 30,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9999FF',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  contactCardsContainer: {
    gap: 15,
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  contactCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contactInfo: {
    fontSize: 16,
    color: '#9999FF',
    fontWeight: '600',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  formSection: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9999FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  textArea: {
    height: 100,
    paddingTop: 15,
  },
  requiredNote: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default ContatosScreen;