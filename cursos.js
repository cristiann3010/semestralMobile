import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Menu from './menu'; // Ajuste o caminho conforme sua estrutura

const Cursos = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const cursos = [
    {
      id: 1,
      icon: '</>',
      title: 'Desenvolvimento Web Full-Stack',
      description: 'Aprenda a criar aplicações web completas, do front-end ao back-end, com as tecnologias mais recentes do mercado.',
      duration: '12 meses',
      level: 'Intermediário',
    },
    {
      id: 2,
      icon: '📱',
      title: 'Desenvolvimento Mobile',
      description: 'Domine React Native e Flutter para criar aplicativos móveis nativos para iOS e Android.',
      duration: '10 meses',
      level: 'Intermediário',
    },
    {
      id: 3,
      icon: '🤖',
      title: 'Inteligência Artificial',
      description: 'Explore o mundo da IA com Python, Machine Learning e Deep Learning aplicados a problemas reais.',
      duration: '14 meses',
      level: 'Avançado',
    },
    {
      id: 4,
      icon: '☁️',
      title: 'Cloud Computing',
      description: 'Aprenda a trabalhar com AWS, Azure e Google Cloud para criar soluções escaláveis na nuvem.',
      duration: '8 meses',
      level: 'Intermediário',
    },
    {
      id: 5,
      icon: '🔐',
      title: 'Cybersecurity',
      description: 'Torne-se um especialista em segurança digital e proteção de sistemas e dados corporativos.',
      duration: '11 meses',
      level: 'Avançado',
    },
  ];

  const CursoCard = ({ curso }) => (
    <View style={styles.cursoCard}>
      <View style={styles.cursoHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.cursoIcon}>{curso.icon}</Text>
        </View>
        <View style={styles.cursoInfo}>
          <View style={styles.cursoBadges}>
            <Text style={styles.badge}>{curso.duration}</Text>
            <Text style={[styles.badge, styles.levelBadge]}>{curso.level}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.cursoTitle}>{curso.title}</Text>
      <Text style={styles.cursoDescription}>{curso.description}</Text>
      
      <TouchableOpacity style={styles.saibaMaisButton} activeOpacity={0.8}>
        <Text style={styles.saibaMaisText}>Saiba Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0613" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.logo}>◇ AUGEBIT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>CURSOS{'\n'}TÉCNICOS</Text>
          <Text style={styles.heroSubtitle}>
            Explore nossa seleção de cursos técnicos projetados para impulsionar 
            sua carreira na área de tecnologia.
          </Text>
          <View style={styles.arrowDown}>
            <Text style={styles.arrowText}>⌄</Text>
          </View>
        </View>

        {/* Cursos Section */}
        <View style={styles.cursosSection}>
          {cursos.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AUGEBIT © 2025</Text>
          <Text style={styles.footerSubtext}>
            Transformando carreiras através da tecnologia
          </Text>
        </View>
      </ScrollView>

      {/* Menu Component */}
      <Menu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0613',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#0a0613',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5cf6',
    fontFamily: 'Poppins-Bold',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
    maxWidth: 320,
    marginBottom: 30,
  },
  arrowDown: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  arrowText: {
    fontSize: 20,
    color: '#8b5cf6',
    fontWeight: 'bold',
  },
  cursosSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cursoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cursoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursoIcon: {
    fontSize: 24,
    color: '#8b5cf6',
  },
  cursoInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cursoBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  levelBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    color: '#22c55e',
  },
  cursoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    lineHeight: 26,
  },
  cursoDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  saibaMaisButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  saibaMaisText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  footerText: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#cccccc',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default Cursos;