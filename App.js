import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ImageBackground, Image, ScrollView, Animated, Pressable } from 'react-native';
import Menu from './menu';
import CursosScreen from './cursos';
import LoginScreen from './login';
import CadastroScreen from './cadastro';

const { width, height } = Dimensions.get('window');

// Constantes
const HERO_HEIGHT = height * 0.85;
const OVERLAY_COLOR = 'rgba(26, 15, 46, 0.2)';
const MENU_BG_COLOR = 'rgba(255, 255, 255, 0.1)';
const MENU_BORDER_COLOR = 'rgba(255, 255, 255, 0.2)';

// Componente de botão animado
const AnimatedButton = ({ style, children, onPress, animationType = 'scale' }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    const animation = animationType === 'scale' 
      ? Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true, tension: 150, friction: 8 })
      : Animated.timing(opacityValue, { toValue: 0.7, duration: 150, useNativeDriver: true });
    animation.start();
  };

  const handlePressOut = () => {
    const animation = animationType === 'scale'
      ? Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, tension: 150, friction: 8 })
      : Animated.timing(opacityValue, { toValue: 1, duration: 150, useNativeDriver: true });
    animation.start();
  };

  const animatedStyle = {
    transform: animationType === 'scale' ? [{ scale: scaleValue }] : [],
    opacity: animationType === 'opacity' ? opacityValue : 1,
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={[style, { opacity: 1 }]}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};

// Componente de menu animado
const AnimatedMenuButton = ({ onPress, children }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(rotateValue, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 0.9, useNativeDriver: true, tension: 150, friction: 8 })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(rotateValue, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, tension: 150, friction: 8 })
    ]).start();
  };

  const animatedStyle = {
    transform: [
      { rotate: rotateValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] }) },
      { scale: scaleValue }
    ],
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={styles.menuButton}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};

// Dados estáticos
const NEWS_DATA = [
  { id: 1, date: '15 Maio 2025', title: 'Novidades em Tecnologia', action: 'Leia Mais' },
  { id: 2, date: '15 Maio 2025', title: 'Novidades em Tecnologia', action: 'Leia Mais' },
  { id: 3, date: '15 Maio 2025', title: 'Novidades em Tecnologia', action: 'Leia Mais' },
];

const FOOTER_LINKS = [
  { id: 1, text: 'Início' }, { id: 2, text: 'Blog' }, { id: 3, text: 'Cursos' }, { id: 4, text: 'Área Administrativa' },
];

const CONTACT_INFO = [
  { id: 1, icon: '📞', text: '+55 (047) 0000' },
  { id: 2, icon: '✉️', text: 'augebit.10@gmail.com' },
  { id: 3, icon: '📍', text: 'Rua Exemplo, 123 - Cidade' },
];

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callbacks memoizados
  const handleMenuPress = useCallback(() => setMenuVisible(true), []);
  const handleMenuClose = useCallback(() => setMenuVisible(false), []);
  const handleNavigate = useCallback((screen) => { setCurrentScreen(screen); setMenuVisible(false); }, []);
  const handleLogin = useCallback(() => setCurrentScreen('login'), []);
  const handleCadastro = useCallback(() => setCurrentScreen('cadastro'), []);
  const handleLoginSuccess = useCallback(() => { setIsLoggedIn(true); setCurrentScreen('home'); }, []);
  const handleRegisterSuccess = useCallback(() => setCurrentScreen('login'), []);
  const handleNavigateToLogin = useCallback(() => setCurrentScreen('login'), []);
  const handleVerTodos = useCallback(() => console.log('Ver Todos pressionado'), []);
  const handleFooterLink = useCallback((linkText) => {
    if (linkText === 'Cursos') setCurrentScreen('cursos');
    else console.log(`${linkText} pressionado`);
  }, []);

  // Componentes memoizados
  const MenuIcon = useMemo(() => (
    <View style={styles.menuIconContainer}>
      {[...Array(3)].map((_, i) => <View key={i} style={styles.menuLine} />)}
    </View>
  ), []);

  const FixedHeader = useMemo(() => (
    <View style={styles.fixedHeaderContainer}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => setCurrentScreen('home')} activeOpacity={0.8}>
        <Image source={require('./img/logo-removebg-preview 2.png')} style={styles.logoImage} resizeMode="contain" />
      </TouchableOpacity>
      <AnimatedMenuButton onPress={handleMenuPress}>{MenuIcon}</AnimatedMenuButton>
    </View>
  ), [handleMenuPress, MenuIcon]);

  // Renderização condicional das telas
  if (currentScreen === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
        <LoginScreen 
          onNavigateBack={() => setCurrentScreen('home')} 
          onLoginSuccess={handleLoginSuccess}
        />
        {menuVisible && <Menu visible={menuVisible} onClose={handleMenuClose} onNavigate={handleNavigate} />}
      </SafeAreaView>
    );
  }

  if (currentScreen === 'cadastro') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
        <CadastroScreen 
          onNavigateBack={() => setCurrentScreen('home')} 
          onNavigateToLogin={handleNavigateToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
        {menuVisible && <Menu visible={menuVisible} onClose={handleMenuClose} onNavigate={handleNavigate} />}
      </SafeAreaView>
    );
  }

  if (currentScreen === 'cursos') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
        <CursosScreen onNavigateBack={() => setCurrentScreen('home')} />
        {menuVisible && <Menu visible={menuVisible} onClose={handleMenuClose} onNavigate={handleNavigate} />}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      {FixedHeader}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('./img/Rectangle 41.png')} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.overlay} />
          <View style={styles.headerSpacer} />

          <View style={styles.mainContent}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeText}>Bem vindo ao</Text>
              <Text style={styles.augeBitText}>AUGEBIT</Text>
              {isLoggedIn && <Text style={styles.loggedInText}>Você está logado!</Text>}
            </View>
            <View style={styles.flexSpace} />
            <View style={styles.buttonsSection}>
              <AnimatedButton style={styles.primaryButton} onPress={handleLogin} animationType="scale">
                <Text style={styles.primaryButtonText}>{isLoggedIn ? 'Área do Usuário' : 'Login'}</Text>
              </AnimatedButton>
              <AnimatedButton style={styles.secondaryButton} onPress={handleCadastro} animationType="scale">
                <Text style={styles.secondaryButtonText}>Cadastre-se</Text>
              </AnimatedButton>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.contentSections}>
          {/* Seções de conteúdo */}
          {[
            { title: 'What is lorem ?', text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.' },
            { title: 'What is lorem ?', text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up...', extra: 'McClintock.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
            { title: 'What is lorem ipsum?', text: 'McClintock.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' }
          ].map((section, i) => (
            <View key={i} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionText}>{section.text}</Text>
              {section.extra && <Text style={styles.readMore}>{section.extra}</Text>}
            </View>
          ))}

          {/* Seção Novidades */}
          <View style={styles.novidadesSection}>
            <Text style={styles.novidadesTitle}>NOVIDADES</Text>
            <AnimatedButton style={styles.verTodosButton} onPress={handleVerTodos} animationType="opacity">
              <Text style={styles.verTodosText}>Ver Todos</Text>
              <Text style={styles.arrowText}>→</Text>
            </AnimatedButton>
          </View>

          {/* Cards de Notícias */}
          <View style={styles.newsCardsContainer}>
            {NEWS_DATA.map((news) => (
              <View key={news.id} style={styles.newsCard}>
                <View style={styles.newsImagePlaceholder} />
                <View style={styles.newsContent}>
                  <Text style={styles.newsDate}>{news.date}</Text>
                  <Text style={styles.newsTitle}>{news.title}</Text>
                  <Text style={styles.newsAuthor}>{news.action}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.footerLogoContainer}>
            <Image source={require('./img/logo-removebg-preview 2.png')} style={styles.footerLogoImage} resizeMode="contain" />
          </View>

          <View style={styles.agencyInfo}>
            <Text style={styles.agencyName}>Agência de Comunicação Marta Lúcia</Text>
            <Text style={styles.agencyCode}>123456789/0001-00</Text>
          </View>

          <View style={styles.quickLinksSection}>
            <Text style={styles.sectionTitleFooter}>Links Rápidos</Text>
            {FOOTER_LINKS.map((link) => (
              <TouchableOpacity key={link.id} style={styles.footerLink} onPress={() => handleFooterLink(link.text)}>
                <Text style={styles.footerLinkText}>{link.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitleFooter}>Contato</Text>
            {CONTACT_INFO.map((contact) => (
              <View key={contact.id} style={styles.contactItem}>
                <Text style={styles.contactIcon}>{contact.icon}</Text>
                <Text style={styles.contactText}>{contact.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.copyrightSection}>
            <Text style={styles.copyrightText}>© 2025 AUGEBIT. Todos os direitos reservados.</Text>
          </View>
        </View>
      </ScrollView>

      {menuVisible && <Menu visible={menuVisible} onClose={handleMenuClose} onNavigate={handleNavigate} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0f2e' },
  scrollView: { flex: 1 },
  backgroundImage: { width: '100%', height: HERO_HEIGHT },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: OVERLAY_COLOR },
  fixedHeaderContainer: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, paddingTop: 50, backgroundColor: 'rgba(26, 15, 46, 0.95)', zIndex: 1000, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  headerSpacer: { height: 115 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', height: 20 },
  logoImage: { width: 200, height: 100 },
  menuButton: { padding: 10, backgroundColor: MENU_BG_COLOR, borderRadius: 10, borderWidth: 1, borderColor: MENU_BORDER_COLOR },
  menuIconContainer: { width: 20, height: 15, justifyContent: 'space-between', alignItems: 'center' },
  menuLine: { width: 18, height: 2, backgroundColor: '#ffffff', borderRadius: 1 },
  mainContent: { flex: 1, paddingHorizontal: 30, paddingBottom: 50, zIndex: 5 },
  welcomeSection: { alignItems: 'center', marginTop: 80 },
  welcomeText: { fontSize: 56, fontWeight: '300', color: '#ffffff', marginBottom: 5, textAlign: 'center' },
  augeBitText: { fontSize: 66, fontWeight: 'bold', color: '#9474FF', letterSpacing: 2, textAlign: 'center' },
  flexSpace: { flex: 1, minHeight: 100 },
  buttonsSection: { gap: 15, marginBottom: 20 },
  primaryButton: { backgroundColor: '#6366f1', paddingVertical: 16, borderRadius: 25, alignItems: 'center', shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  primaryButtonText: { fontSize: 18, fontWeight: '600', color: '#ffffff' },
  secondaryButton: { backgroundColor: '#000000', paddingVertical: 16, borderRadius: 25, alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.2)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  secondaryButtonText: { fontSize: 18, fontWeight: '600', color: '#ffffff' },
  contentSections: { backgroundColor: '#1a0f2e', paddingHorizontal: 20, paddingVertical: 30, paddingBottom: 0 },
  sectionContainer: { marginBottom: 40, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(139, 92, 246, 0.2)' },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#9999FF', marginBottom: 15, textAlign: 'left' },
  sectionText: { fontSize: 16, lineHeight: 24, color: '#ffffff', textAlign: 'justify', marginBottom: 10 },
  readMore: { fontSize: 16, lineHeight: 24, color: '#cccccc', textAlign: 'justify' },
  novidadesSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingVertical: 20 },
  novidadesTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1 },
  verTodosButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.3)' },
  verTodosText: { fontSize: 16, color: '#ffffff', marginRight: 8 },
  arrowText: { fontSize: 16, color: '#8b5cf6', fontWeight: 'bold' },
  newsCardsContainer: { marginTop: 30, marginBottom: 30, gap: 25 },
  newsCard: { backgroundColor: '#000000', borderRadius: 15, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  newsImagePlaceholder: { width: '100%', height: 150, backgroundColor: '#d3d3d3' },
  newsContent: { padding: 20 },
  newsDate: { fontSize: 14, color: '#cccccc', marginBottom: 8 },
  newsTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 12, lineHeight: 24 },
  newsAuthor: { fontSize: 14, color: '#8b5cf6', fontWeight: '500' },
  footerContainer: { backgroundColor: '#0d0a1a', paddingVertical: 40, paddingHorizontal: 20, width: '100%', marginHorizontal: 0 },
  footerLogoContainer: { alignItems: 'center', marginBottom: 25 },
  footerLogoImage: { width: 120, height: 40 },
  agencyInfo: { alignItems: 'center', marginBottom: 30 },
  agencyName: { fontSize: 16, color: '#cccccc', textAlign: 'center', marginBottom: 5 },
  agencyCode: { fontSize: 14, color: '#999999', textAlign: 'center' },
  quickLinksSection: { marginBottom: 30 },
  sectionTitleFooter: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginBottom: 15 },
  footerLink: { paddingVertical: 8 },
  footerLinkText: { fontSize: 16, color: '#cccccc' },
  contactSection: { marginBottom: 30 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  contactIcon: { fontSize: 16, marginRight: 12, width: 20 },
  contactText: { fontSize: 16, color: '#cccccc', flex: 1 },
  copyrightSection: { borderTopWidth: 1, borderTopColor: 'rgba(139, 92, 246, 0.2)', paddingTop: 20, alignItems: 'center' },
  copyrightText: { fontSize: 14, color: '#999999', textAlign: 'center' },
});