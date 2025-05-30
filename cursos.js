import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Animated,
  Pressable,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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

// Dados dos cursos
const CURSOS_DATA = [
  {
    id: 1,
    titulo: 'Desenvolvimento Web Full Stack',
    duracao: '6 meses',
    nivel: 'Intermediário',
    categoria: 'Tecnologia',
    descricao: 'Aprenda a desenvolver aplicações web completas usando tecnologias modernas como React, Node.js e bancos de dados.',
    preco: 'R$ 2.500,00',
    cargaHoraria: '200h',
    modalidade: 'Online'
  },
  {
    id: 2,
    titulo: 'Design UX/UI',
    duracao: '4 meses',
    nivel: 'Básico',
    categoria: 'Design',
    descricao: 'Domine os fundamentos do design de interfaces e experiência do usuário com ferramentas profissionais.',
    preco: 'R$ 1.800,00',
    cargaHoraria: '120h',
    modalidade: 'Híbrido'
  },
  {
    id: 3,
    titulo: 'Marketing Digital',
    duracao: '3 meses',
    nivel: 'Básico',
    categoria: 'Marketing',
    descricao: 'Estratégias de marketing digital, redes sociais, SEO e análise de dados para impulsionar negócios.',
    preco: 'R$ 1.200,00',
    cargaHoraria: '80h',
    modalidade: 'Online'
  },
  {
    id: 4,
    titulo: 'Análise de Dados',
    duracao: '5 meses',
    nivel: 'Avançado',
    categoria: 'Tecnologia',
    descricao: 'Transforme dados em insights valiosos usando Python, SQL e ferramentas de visualização.',
    preco: 'R$ 3.000,00',
    cargaHoraria: '180h',
    modalidade: 'Online'
  },
  {
    id: 5,
    titulo: 'Gestão de Projetos',
    duracao: '4 meses',
    nivel: 'Intermediário',
    categoria: 'Gestão',
    descricao: 'Metodologias ágeis, liderança de equipes e gestão eficiente de projetos empresariais.',
    preco: 'R$ 2.200,00',
    cargaHoraria: '150h',
    modalidade: 'Híbrido'
  },
  {
    id: 6,
    titulo: 'Segurança da Informação',
    duracao: '6 meses',
    nivel: 'Avançado',
    categoria: 'Tecnologia',
    descricao: 'Proteja sistemas e dados contra ameaças cibernéticas com técnicas avançadas de segurança.',
    preco: 'R$ 3.500,00',
    cargaHoraria: '220h',
    modalidade: 'Online'
  }
];

const CATEGORIAS = ['Todos', 'Tecnologia', 'Design', 'Marketing', 'Gestão'];
const NIVEIS = ['Todos', 'Básico', 'Intermediário', 'Avançado'];

const CursosScreen = ({ onNavigateBack }) => {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  // Callbacks memoizados
  const handleVoltar = useCallback(() => onNavigateBack(), [onNavigateBack]);
  const handleFiltroCategoria = useCallback((categoria) => setFiltroCategoria(categoria), []);
  const handleFiltroNivel = useCallback((nivel) => setFiltroNivel(nivel), []);
  const handleCursoPress = useCallback((curso) => setCursoSelecionado(curso), []);
  const handleFecharDetalhes = useCallback(() => setCursoSelecionado(null), []);
  const handleInscricao = useCallback((curso) => {
    console.log('Inscrição no curso:', curso.titulo);
    setCursoSelecionado(null);
  }, []);

  // Filtrar cursos
  const cursosFiltrados = useMemo(() => {
    return CURSOS_DATA.filter(curso => {
      const categoriaMatch = filtroCategoria === 'Todos' || curso.categoria === filtroCategoria;
      const nivelMatch = filtroNivel === 'Todos' || curso.nivel === filtroNivel;
      return categoriaMatch && nivelMatch;
    });
  }, [filtroCategoria, filtroNivel]);

  // Componente de Card do Curso
  const CursoCard = ({ curso }) => (
    <AnimatedButton
      style={styles.cursoCard}
      onPress={() => handleCursoPress(curso)}
      animationType="scale"
    >
      <View style={styles.cursoHeader}>
        <View style={styles.cursoCategoria}>
          <Text style={styles.cursoCategoriaText}>{curso.categoria}</Text>
        </View>
        <View style={styles.cursoNivel}>
          <Text style={styles.cursoNivelText}>{curso.nivel}</Text>
        </View>
      </View>
      
      <Text style={styles.cursoTitulo}>{curso.titulo}</Text>
      <Text style={styles.cursoDescricao} numberOfLines={3}>{curso.descricao}</Text>
      
      <View style={styles.cursoInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Duração:</Text>
          <Text style={styles.infoValue}>{curso.duracao}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Modalidade:</Text>
          <Text style={styles.infoValue}>{curso.modalidade}</Text>
        </View>
      </View>
      
      <View style={styles.cursoFooter}>
        <Text style={styles.cursoPreco}>{curso.preco}</Text>
        <Text style={styles.cursoCargaHoraria}>{curso.cargaHoraria}</Text>
      </View>
    </AnimatedButton>
  );

  // Componente de Detalhes do Curso (Modal)
  const DetalhesModal = () => {
    if (!cursoSelecionado) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.fecharButton} onPress={handleFecharDetalhes}>
                <Text style={styles.fecharButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalContent}>
              <View style={styles.modalCategorias}>
                <View style={styles.cursoCategoria}>
                  <Text style={styles.cursoCategoriaText}>{cursoSelecionado.categoria}</Text>
                </View>
                <View style={styles.cursoNivel}>
                  <Text style={styles.cursoNivelText}>{cursoSelecionado.nivel}</Text>
                </View>
              </View>
              
              <Text style={styles.modalTitulo}>{cursoSelecionado.titulo}</Text>
              <Text style={styles.modalDescricao}>{cursoSelecionado.descricao}</Text>
              
              <View style={styles.modalInfoGrid}>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoLabel}>Duração</Text>
                  <Text style={styles.modalInfoValue}>{cursoSelecionado.duracao}</Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoLabel}>Carga Horária</Text>
                  <Text style={styles.modalInfoValue}>{cursoSelecionado.cargaHoraria}</Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoLabel}>Modalidade</Text>
                  <Text style={styles.modalInfoValue}>{cursoSelecionado.modalidade}</Text>
                </View>
                <View style={styles.modalInfoItem}>
                  <Text style={styles.modalInfoLabel}>Preço</Text>
                  <Text style={styles.modalInfoPreco}>{cursoSelecionado.preco}</Text>
                </View>
              </View>
              
              <AnimatedButton
                style={styles.inscricaoButton}
                onPress={() => handleInscricao(cursoSelecionado)}
                animationType="scale"
              >
                <Text style={styles.inscricaoButtonText}>Fazer Inscrição</Text>
              </AnimatedButton>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
          <Text style={styles.voltarButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cursos Técnicos</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosScroll}>
          <View style={styles.filtroGroup}>
            <Text style={styles.filtroLabel}>Categoria:</Text>
            {CATEGORIAS.map((categoria) => (
              <TouchableOpacity
                key={categoria}
                style={[
                  styles.filtroButton,
                  filtroCategoria === categoria && styles.filtroButtonActive
                ]}
                onPress={() => handleFiltroCategoria(categoria)}
              >
                <Text style={[
                  styles.filtroButtonText,
                  filtroCategoria === categoria && styles.filtroButtonTextActive
                ]}>
                  {categoria}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosScroll}>
          <View style={styles.filtroGroup}>
            <Text style={styles.filtroLabel}>Nível:</Text>
            {NIVEIS.map((nivel) => (
              <TouchableOpacity
                key={nivel}
                style={[
                  styles.filtroButton,
                  filtroNivel === nivel && styles.filtroButtonActive
                ]}
                onPress={() => handleFiltroNivel(nivel)}
              >
                <Text style={[
                  styles.filtroButtonText,
                  filtroNivel === nivel && styles.filtroButtonTextActive
                ]}>
                  {nivel}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Lista de Cursos */}
      <ScrollView style={styles.cursosContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cursosGrid}>
          {cursosFiltrados.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </View>
        
        {cursosFiltrados.length === 0 && (
          <View style={styles.emptyCursos}>
            <Text style={styles.emptyCursosText}>Nenhum curso encontrado com os filtros selecionados.</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de Detalhes */}
      <DetalhesModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0f2e' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: '#1a0f2e',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  voltarButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  voltarButtonText: { fontSize: 16, color: '#ffffff', fontWeight: '500' },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: { width: 80 },
  filtrosContainer: {
    backgroundColor: '#1a0f2e',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.1)',
  },
  filtrosScroll: { paddingHorizontal: 20 },
  filtroGroup: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  filtroLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: 10,
    fontWeight: '500',
    minWidth: 70,
  },
  filtroButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filtroButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  filtroButtonText: { fontSize: 12, color: '#ffffff', fontWeight: '500' },
  filtroButtonTextActive: { color: '#ffffff' },
  cursosContainer: { flex: 1, backgroundColor: '#1a0f2e' },
  cursosGrid: { padding: 20, gap: 20 },
  cursoCard: {
    backgroundColor: '#000000',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cursoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cursoCategoria: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cursoCategoriaText: { fontSize: 12, color: '#8b5cf6', fontWeight: '600' },
  cursoNivel: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cursoNivelText: { fontSize: 12, color: '#ffffff', fontWeight: '500' },
  cursoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 24,
  },
  cursoDescricao: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  cursoInfo: { marginBottom: 15 },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoLabel: { fontSize: 14, color: '#999999' },
  infoValue: { fontSize: 14, color: '#ffffff', fontWeight: '500' },
  cursoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
  },
  cursoPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  cursoCargaHoraria: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '500',
  },
  emptyCursos: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyCursosText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#1a0f2e',
    borderRadius: 20,
    margin: 20,
    maxHeight: height * 0.8,
    width: width * 0.9,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 10,
  },
  fecharButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  fecharButtonText: { fontSize: 18, color: '#ffffff', fontWeight: 'bold' },
  modalContent: { paddingHorizontal: 20, paddingBottom: 30 },
  modalCategorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    lineHeight: 30,
  },
  modalDescricao: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 25,
  },
  modalInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  modalInfoItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  modalInfoLabel: { fontSize: 12, color: '#999999', marginBottom: 5 },
  modalInfoValue: { fontSize: 16, color: '#ffffff', fontWeight: '600' },
  modalInfoPreco: { fontSize: 18, color: '#8b5cf6', fontWeight: 'bold' },
  inscricaoButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inscricaoButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CursosScreen;