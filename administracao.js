import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, Image, ScrollView, Animated, Pressable, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

// Constantes
const HEADER_HEIGHT = 115;
const CARD_MARGIN = 20;

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

// Dados mockados para demonstração
const ADMIN_STATS = [
  { id: 1, title: 'Usuários Ativos', value: '1.247', icon: '👤', color: '#6366f1' },
  { id: 2, title: 'Cursos Publicados', value: '24', icon: '📚', color: '#8b5cf6' },
  { id: 3, title: 'Posts no Blog', value: '89', icon: '📝', color: '#06b6d4' },
  { id: 4, title: 'Mensagens', value: '156', icon: '💬', color: '#10b981' },
];

const RECENT_ACTIVITIES = [
  { id: 1, action: 'Novo usuário cadastrado', user: 'João Silva', time: '2 min atrás' },
  { id: 2, action: 'Curso publicado', user: 'Admin', time: '15 min atrás' },
  { id: 3, action: 'Post do blog criado', user: 'Maria Santos', time: '1h atrás' },
  { id: 4, action: 'Comentário aprovado', user: 'Pedro Costa', time: '2h atrás' },
];

export default function AdministracaoScreen({ onNavigateBack }) {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const handleSearch = useCallback((text) => setSearchText(text), []);
  const handleTabChange = useCallback((tab) => setSelectedTab(tab), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      {/* Header fixo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack} activeOpacity={0.8}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image source={require('./img/logo-removebg-preview 2.png')} style={styles.logoImage} resizeMode="contain" />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Título da página */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Área Administrativa</Text>
          <Text style={styles.pageSubtitle}>Gerencie sua plataforma</Text>
        </View>

        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar..."
              placeholderTextColor="#999999"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* Abas de navegação */}
        <View style={styles.tabsContainer}>
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'usuarios', label: 'Usuários' },
            { key: 'cursos', label: 'Cursos' },
            { key: 'blog', label: 'Blog' }
          ].map((tab) => (
            <AnimatedButton
              key={tab.key}
              style={[styles.tabButton, selectedTab === tab.key && styles.activeTab]}
              onPress={() => handleTabChange(tab.key)}
              animationType="opacity"
            >
              <Text style={[styles.tabText, selectedTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </AnimatedButton>
          ))}
        </View>

        {/* Cards de estatísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estatísticas Gerais</Text>
          <View style={styles.statsGrid}>
            {ADMIN_STATS.map((stat) => (
              <View key={stat.id} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                <View style={styles.statHeader}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                </View>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Atividades recentes */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <View style={styles.activitiesList}>
            {RECENT_ACTIVITIES.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <View style={styles.activityMeta}>
                    <Text style={styles.activityUser}>{activity.user}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ações rápidas */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            {[
              { icon: '➕', title: 'Novo Curso', subtitle: 'Criar curso' },
              { icon: '📝', title: 'Nova Postagem', subtitle: 'Escrever no blog' },
              { icon: '👥', title: 'Gerenciar Usuários', subtitle: 'Ver usuários' },
              { icon: '⚙️', title: 'Configurações', subtitle: 'Sistema' }
            ].map((action, index) => (
              <AnimatedButton key={index} style={styles.actionCard} animationType="scale">
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </AnimatedButton>
            ))}
          </View>
        </View>

        {/* Botão de logout */}
        <View style={styles.logoutContainer}>
          <AnimatedButton style={styles.logoutButton} animationType="scale">
            <Text style={styles.logoutText}>Sair da Administração</Text>
          </AnimatedButton>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0f2e' },
  scrollView: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, paddingTop: 50, backgroundColor: 'rgba(26, 15, 46, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(139, 92, 246, 0.2)' },
  backButton: { padding: 8, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  backArrow: { fontSize: 20, color: '#ffffff', fontFamily: 'Poppins-Regular' },
  logoImage: { width: 120, height: 40 },
  headerRight: { position: 'relative' },
  notificationButton: { padding: 8, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  notificationIcon: { fontSize: 18 },
  notificationBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#ef4444', borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 12, color: '#ffffff', fontWeight: 'bold', fontFamily: 'Poppins-Bold' },
  titleSection: { paddingHorizontal: 20, paddingVertical: 25 },
  pageTitle: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', marginBottom: 5, fontFamily: 'Poppins-Bold' },
  pageSubtitle: { fontSize: 16, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  searchContainer: { paddingHorizontal: 20, marginBottom: 20 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  searchIcon: { fontSize: 16, marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#ffffff', fontFamily: 'Poppins-Regular' },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 25, gap: 10 },
  tabButton: { flex: 1, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  activeTab: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  tabText: { fontSize: 14, color: '#cccccc', fontWeight: '500', fontFamily: 'Poppins-Medium' },
  activeTabText: { color: '#ffffff' },
  statsContainer: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginBottom: 15, fontFamily: 'Poppins-Bold' },
  statsGrid: { gap: 15 },
  statCard: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 20, borderLeftWidth: 4, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statIcon: { fontSize: 24 },
  statValue: { fontSize: 28, fontWeight: 'bold', fontFamily: 'Poppins-Bold' },
  statTitle: { fontSize: 16, color: '#cccccc', fontFamily: 'Poppins-Regular' },
  activitiesContainer: { paddingHorizontal: 20, marginBottom: 30 },
  activitiesList: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 20 },
  activityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#8b5cf6', marginRight: 15, marginTop: 6 },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 16, color: '#ffffff', marginBottom: 5, fontFamily: 'Poppins-Regular' },
  activityMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  activityUser: { fontSize: 14, color: '#8b5cf6', fontFamily: 'Poppins-Medium' },
  activityTime: { fontSize: 14, color: '#999999', fontFamily: 'Poppins-Regular' },
  quickActionsContainer: { paddingHorizontal: 20, marginBottom: 30 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  actionCard: { width: (width - 55) / 2, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  actionIcon: { fontSize: 32, marginBottom: 10 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 5, fontFamily: 'Poppins-Bold' },
  actionSubtitle: { fontSize: 14, color: '#cccccc', textAlign: 'center', fontFamily: 'Poppins-Regular' },
  logoutContainer: { paddingHorizontal: 20, marginBottom: 20 },
  logoutButton: { backgroundColor: '#ef4444', paddingVertical: 16, borderRadius: 15, alignItems: 'center', shadowColor: '#ef4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#ffffff', fontFamily: 'Poppins-Bold' },
  bottomSpacer: { height: 30 },
});