
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SaibaMaisScreen = ({ onNavigateBack }) => {
  // Animações
  const fadeValue = useRef(new Animated.Value(0)).current;
  const slideValue = useRef(new Animated.Value(50)).current;
  const scaleValue = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
    ]).start();
  }, []);

  // Dados da empresa
  const companyStats = [
    { id: 1, number: '50+', label: 'Projetos Concluídos', icon: '🚀' },
    { id: 2, number: '5+', label: 'Anos de Experiência', icon: '⏰' },
    { id: 3, number: '30+', label: 'Clientes Satisfeitos', icon: '😊' },
    { id: 4, number: '100%', label: 'Dedicação', icon: '💯' },
  ];

  const services = [
    {
      id: 1,
      title: 'Design Industrial',
      description: 'Desenvolvimento de produtos inovadores para a indústria com foco em funcionalidade e estética.',
      icon: '🎨',
    },
    {
      id: 2,
      title: 'Gestão de Projetos',
      description: 'Acompanhamento completo desde o conceito até a entrega final do produto.',
      icon: '📊',
    },
    {
      id: 3,
      title: 'Consultoria Técnica',
      description: 'Orientação especializada para otimização de processos e produtos industriais.',
      icon: '🔧',
    },
    {
      id: 4,
      title: 'Mentoria Profissional',
      description: 'Desenvolvimento técnico da equipe com mentoria direta do diretor de arte.',
      icon: '👨‍🏫',
    },
  ];

  const teamValues = [
    {
      id: 1,
      title: 'Inovação',
      description: 'Buscamos sempre soluções criativas e tecnológicas de ponta.',
      icon: '💡',
    },
    {
      id: 2,
      title: 'Qualidade',
      description: 'Compromisso com a excelência em cada projeto desenvolvido.',
      icon: '⭐',
    },
    {
      id: 3,
      title: 'Colaboração',
      description: 'Trabalho em equipe e parceria com nossos clientes.',
      icon: '🤝',
    },
    {
      id: 4,
      title: 'Sustentabilidade',
      description: 'Responsabilidade ambiental em todos os nossos processos.',
      icon: '🌱',
    },
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
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saiba Mais</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeValue,
              transform: [{ translateY: slideValue }]
            }
          ]}
        >
          {/* Hero Section */}
          <Animated.View 
            style={[
              styles.heroSection,
              { transform: [{ scale: scaleValue }] }
            ]}
          >
            <View style={styles.logoContainer}>
              <Image 
                source={require('./img/logo-removebg-preview 2.png')} 
                style={styles.heroLogo} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.heroTitle}>AUGEBIT</Text>
            <Text style={styles.heroSubtitle}>
              Transformando ideias em realidade através do design industrial
            </Text>
          </Animated.View>

          {/* Estatísticas */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Nossos Números</Text>
            <View style={styles.statsGrid}>
              {companyStats.map((stat) => (
                <View key={stat.id} style={styles.statCard}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Sobre a Empresa */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>Nossa História</Text>
            <Text style={styles.aboutText}>
              A Augebit nasceu da paixão por transformar ideias em produtos reais e funcionais. 
              Especializada em design industrial, nossa empresa se dedica ao desenvolvimento e 
              gestão de projetos voltados para equipamentos e produtos de consumo final para indústrias.
            </Text>
            <Text style={styles.aboutText}>
              Nossa equipe qualificada trabalha com um diferencial estratégico único: todos os 
              colaboradores recebem mentoria direta do diretor de arte da empresa, garantindo 
              um desenvolvimento técnico superior e resultados excepcionais em cada projeto.
            </Text>
          </View>

          {/* Serviços */}
          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Nossos Serviços</Text>
            <View style={styles.servicesList}>
              {services.map((service) => (
                <View key={service.id} style={styles.serviceCard}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceIcon}>{service.icon}</Text>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                  </View>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Valores */}
          <View style={styles.valuesSection}>
            <Text style={styles.sectionTitle}>Nossos Valores</Text>
            <View style={styles.valuesGrid}>
              {teamValues.map((value) => (
                <View key={value.id} style={styles.valueCard}>
                  <Text style={styles.valueIcon}>{value.icon}</Text>
                  <Text style={styles.valueTitle}>{value.title}</Text>
                  <Text style={styles.valueDescription}>{value.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Missão, Visão e Valores */}
          <View style={styles.missionSection}>
            <View style={styles.missionCard}>
              <Text style={styles.missionTitle}>🎯 Nossa Missão</Text>
              <Text style={styles.missionText}>
                Desenvolver soluções inovadoras em design industrial que transformem 
                ideias em produtos de alta qualidade, contribuindo para o crescimento 
                sustentável de nossos clientes e da sociedade.
              </Text>
            </View>

            <View style={styles.missionCard}>
              <Text style={styles.missionTitle}>👁️ Nossa Visão</Text>
              <Text style={styles.missionText}>
                Ser reconhecida como referência em design industrial no Brasil, 
                sendo a primeira escolha de empresas que buscam excelência e 
                inovação em seus produtos.
              </Text>
            </View>
          </View>

          {/* Diferencial */}
          <View style={styles.differentialSection}>
            <Text style={styles.sectionTitle}>Nosso Diferencial</Text>
            <View style={styles.differentialCard}>
              <Text style={styles.differentialIcon}>🌟</Text>
              <Text style={styles.differentialTitle}>Mentoria Especializada</Text>
              <Text style={styles.differentialText}>
                Todos os nossos colaboradores recebem mentoria direta do diretor de arte, 
                garantindo um padrão de qualidade superior e desenvolvimento contínuo da equipe. 
                Este diferencial estratégico nos permite entregar resultados excepcionais 
                e manter nossa equipe sempre atualizada com as melhores práticas do mercado.
              </Text>
            </View>
          </View>

          {/* Call to Action */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Pronto para Inovar?</Text>
            <Text style={styles.ctaText}>
              Entre em contato conosco e descubra como podemos transformar 
              suas ideias em produtos de sucesso.
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => console.log('Navegar para contatos')}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaButtonText}>Fale Conosco</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0f2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: '#4848d8',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#9474FF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSpacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  heroLogo: {
    width: 120,
    height: 80,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#9474FF',
    letterSpacing: 2,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsSection: {
    marginBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  statCard: {
    width: (width - 55) / 2,
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2d',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9474FF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
  aboutSection: {
    marginBottom: 40,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cccccc',
    textAlign: 'justify',
    marginBottom: 15,
  },
  servicesSection: {
    marginBottom: 40,
  },
  servicesList: {
    gap: 20,
  },
  serviceCard: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9474FF',
    flex: 1,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  valuesSection: {
    marginBottom: 40,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  valueCard: {
    width: (width - 55) / 2,
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  valueIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9474FF',
    marginBottom: 8,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 16,
  },
  missionSection: {
    marginBottom: 40,
    gap: 20,
  },
  missionCard: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(70, 0, 232, 0.2)',
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9474FF',
    marginBottom: 15,
  },
  missionText: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    textAlign: 'justify',
  },
  differentialSection: {
    marginBottom: 40,
  },
  differentialCard: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  differentialIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  differentialTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9474FF',
    marginBottom: 15,
    textAlign: 'center',
  },
  differentialText: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    textAlign: 'justify',
  },
  ctaSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default SaibaMaisScreen;