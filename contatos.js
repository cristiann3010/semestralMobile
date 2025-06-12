import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking, SafeAreaView, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ContatosScreen
 = ({ onNavigateBack }) => {
  const [formData, setFormData] = useState({ nome: '', email: '', assunto: '', mensagem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.assunto || !formData.mensagem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    Alert.alert('Sucesso!', 'Sua mensagem foi enviada com sucesso.', [{ text: 'OK', onPress: () => setFormData({ nome: '', email: '', assunto: '', mensagem: '' }) }]);
    setIsSubmitting(false);
  };

  const ContactItem = ({ icon, title, description, onPress }) => (
    <TouchableOpacity style={styles.contactItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.contactIcon}>
        <Text style={styles.contactIconText}>{icon}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contatos</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contactSection}>
          <ContactItem icon="📞" title="Telefone" description="+55 (47) 0000-0000" onPress={() => Linking.openURL('tel:+554700000000')} />
          <ContactItem icon="✉️" title="E-mail" description="augebit.10@gmail.com" onPress={() => Linking.openURL('mailto:augebit.10@gmail.com')} />
          <ContactItem icon="💬" title="WhatsApp" description="Atendimento rápido" onPress={() => Linking.openURL('https://wa.me/554700000000')} />
          <ContactItem icon="📍" title="Endereço" description="Rua Exemplo, 123 - Cidade" />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Envie sua mensagem</Text>
          
          {['nome', 'email', 'assunto'].map(field => (
            <View key={field} style={styles.formGroup}>
              <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Seu ${field}`}
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={formData[field]}
                onChangeText={(text) => setFormData(prev => ({ ...prev, [field]: text }))}
                keyboardType={field === 'email' ? 'email-address' : 'default'}
                autoCapitalize={field === 'email' ? 'none' : 'sentences'}
              />
            </View>
          ))}

          <View style={styles.formGroup}>
            <Text style={styles.label}>Mensagem</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={formData.mensagem}
              onChangeText={(text) => setFormData(prev => ({ ...prev, mensagem: text }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>AUGEBIT © 2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0f2e' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(139, 92, 246, 0.2)', alignItems: 'center', justifyContent: 'center' },
  backButtonText: { fontSize: 20, color: '#ffffff' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  placeholder: { width: 40 },
  scrollView: { flex: 1 },
  contactSection: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, margin: 20, padding: 20 },
  contactItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  contactIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(139, 92, 246, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  contactIconText: { fontSize: 20 },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 5 },
  contactDescription: { fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' },
  formSection: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, margin: 20, padding: 20 },
  formTitle: { fontSize: 20, fontWeight: '600', color: '#ffffff', textAlign: 'center', marginBottom: 20 },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '500', color: '#ffffff', marginBottom: 8 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, padding: 15, fontSize: 16, color: '#ffffff' },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#8b5cf6', borderRadius: 25, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  footer: { alignItems: 'center', paddingVertical: 30 },
  footerText: { fontSize: 12, color: 'rgba(255, 255, 255, 0.5)' },
});

export default ContatosScreen;