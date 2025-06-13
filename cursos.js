import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet,
  Pressable, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';

const CURSOS_DATA = [
  {
    id: 1, 
    titulo: 'Técnico em Automação Industrial', 
    duracao: '6 meses', 
    nivel: 'Intermediário',
    categoria: 'Tecnologia', 
    descricao: 'Atua com elétrica, eletrônica e programação para tornar os processos mais eficientes e seguros.',
    cargaHoraria: '200h', 
    modalidade: 'Presencial',
    preco: 'R$ 2.500,00'
  },
  {
    id: 2, 
    titulo: 'Técnico em Logística', 
    duracao: '4 meses', 
    nivel: 'Básico',
    categoria: 'Design', 
    descricao: 'Organiza transporte, armazenamento e distribuição de produtos.',
    cargaHoraria: '160h', 
    modalidade: 'Online',
    preco: 'R$ 1.800,00'
  },
  {
    id: 3, 
    titulo: 'Técnico em Segurança do Trabalho', 
    duracao: '3 meses', 
    nivel: 'Avançado',
    categoria: 'Marketing', 
    descricao: 'Estratégias avançadas de marketing digital, SEO, redes sociais.',
    cargaHoraria: '120h', 
    modalidade: 'Híbrido',
    preco: 'R$ 2.200,00'
  },
  {
    id: 4, 
    titulo: 'Técnico em Mecatrônica Industrial', 
    duracao: '2 meses', 
    nivel: 'Intermediário',
    categoria: 'Gestão', 
    descricao: 'Metodologias ágeis como Scrum e Kanban para gerenciar projetos.',
    cargaHoraria: '80h', 
    modalidade: 'Online',
    preco: 'R$ 1.500,00'
  },
  {
    id: 5, 
    titulo: 'Técnico em Soldagem', 
    duracao: '5 meses', 
    nivel: 'Básico',
    categoria: 'Tecnologia', 
    descricao: 'Curso completo desde o básico até projetos práticos.',
    cargaHoraria: '180h', 
    modalidade: 'Presencial',
    preco: 'R$ 1.900,00'
  },
  {
    id: 6, 
    titulo: 'Técnico em Eletrotécnica', 
    duracao: '4 meses', 
    nivel: 'Intermediário',
    categoria: 'Design', 
    descricao: 'Interfaces intuitivas e experiências de usuário excepcionais.',
    cargaHoraria: '150h', 
    modalidade: 'Híbrido',
    preco: 'R$ 2.300,00'
  }
];

const CATEGORIAS = ['Todos', 'Tecnologia', 'Design', 'Marketing', 'Gestão'];
const NIVEIS = ['Todos', 'Básico', 'Intermediário', 'Avançado'];
const EXPERIENCIAS = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-graduação'];
const TURNOS = ['Manhã', 'Tarde', 'Noite'];
const MODALIDADES = ['Presencial', 'Online', 'Híbrido'];

const CursosScreen = ({ onBack }) => {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '', email: '', telefone: '', cpf: '', endereco: '', cep: '',
    turno: '', experiencia: '', modalidade: '', motivacao: ''
  });

  const handleVoltar = useCallback(() => {
    if (onBack && typeof onBack === 'function') {
      onBack();
    }
  }, [onBack]);

  const handleFecharDetalhes = useCallback(() => {
    setCursoSelecionado(null);
    setMostrarFormulario(false);
    setDadosFormulario({ 
      nome: '', email: '', telefone: '', cpf: '', endereco: '', cep: '', 
      turno: '', experiencia: '', modalidade: '', motivacao: '' 
    });
  }, []);

  const handleInputChange = useCallback((campo, valor) => {
    setDadosFormulario(prev => ({ ...prev, [campo]: valor }));
  }, []);

  const handleSubmitFormulario = useCallback(() => {
    if (!dadosFormulario.nome || !dadosFormulario.email || !dadosFormulario.telefone || !dadosFormulario.cpf) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    alert(`Inscrição realizada com sucesso!\nCurso: ${cursoSelecionado.titulo}\nNome: ${dadosFormulario.nome}`);
    handleFecharDetalhes();
  }, [dadosFormulario, cursoSelecionado, handleFecharDetalhes]);

  const cursosFiltrados = useMemo(() => CURSOS_DATA.filter(curso => 
    (filtroCategoria === 'Todos' || curso.categoria === filtroCategoria) &&
    (filtroNivel === 'Todos' || curso.nivel === filtroNivel)
  ), [filtroCategoria, filtroNivel]);

  const CustomPicker = ({ value, onValueChange, options, placeholder }) => {
    const [showOptions, setShowOptions] = useState(false);
    return (
      <View style={styles.pickerContainer}>
        <TouchableOpacity 
          style={styles.pickerButton} 
          onPress={() => setShowOptions(!showOptions)}
        >
          <Text style={[styles.pickerText, !value && styles.pickerPlaceholder]}>
            {value || placeholder}
          </Text>
          <Text style={styles.pickerArrow}>{showOptions ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.pickerOptions}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.pickerOption}
                onPress={() => {
                  onValueChange(option);
                  setShowOptions(false);
                }}
              >
                <Text style={styles.pickerOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const CursoCard = ({ curso }) => (
    <TouchableOpacity 
      style={styles.cursoCard} 
      onPress={() => setCursoSelecionado(curso)} 
      activeOpacity={0.7}
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
    </TouchableOpacity>
  );

  const FormField = ({ label, required, children }) => (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>
        {label} {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </Text>
      {children}
    </View>
  );

  const FormularioInscricao = () => (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.formularioContainer}
    >
      <Text style={styles.formularioTitulo}>Formulário de Inscrição</Text>
      <Text style={styles.formularioSubtitulo}>Curso: {cursoSelecionado.titulo}</Text>
      
      <ScrollView 
        style={styles.formulario} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formularioContent}
      >
        <FormField label="Nome Completo" required>
          <TextInput
            value={dadosFormulario.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            style={styles.formInput}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#999"
          />
        </FormField>

        <FormField label="E-mail" required>
          <TextInput
            value={dadosFormulario.email}
            onChangeText={(text) => handleInputChange('email', text)}
            style={styles.formInput}
            keyboardType="email-address"
            placeholder="seu.email@exemplo.com"
            placeholderTextColor="#999"
          />
        </FormField>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.formLabel}>Telefone *</Text>
            <TextInput
              value={dadosFormulario.telefone}
              onChangeText={(text) => handleInputChange('telefone', text)}
              style={styles.formInput}
              keyboardType="phone-pad"
              placeholder="(11) 99999-9999"
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.formLabel}>CPF *</Text>
            <TextInput
              value={dadosFormulario.cpf}
              onChangeText={(text) => handleInputChange('cpf', text)}
              style={styles.formInput}
              placeholder="000.000.000-00"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.formLabel}>CEP</Text>
            <TextInput
              value={dadosFormulario.cep}
              onChangeText={(text) => handleInputChange('cep', text)}
              style={styles.formInput}
              keyboardType="numeric"
              placeholder="00000-000"
              placeholderTextColor="#999"
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.formLabel}>Turno Preferido</Text>
            <CustomPicker
              value={dadosFormulario.turno}
              onValueChange={(value) => handleInputChange('turno', value)}
              options={TURNOS}
              placeholder="Selecione"
            />
          </View>
        </View>

        <FormField label="Endereço">
          <TextInput
            value={dadosFormulario.endereco}
            onChangeText={(text) => handleInputChange('endereco', text)}
            style={styles.formInput}
            placeholder="Rua, número, bairro, cidade"
            placeholderTextColor="#999"
          />
        </FormField>

        <FormField label="Modalidade Preferida">
          <CustomPicker
            value={dadosFormulario.modalidade}
            onValueChange={(value) => handleInputChange('modalidade', value)}
            options={MODALIDADES}
            placeholder="Selecione"
          />
        </FormField>

        <FormField label="Nível de Escolaridade">
          <CustomPicker
            value={dadosFormulario.experiencia}
            onValueChange={(value) => handleInputChange('experiencia', value)}
            options={EXPERIENCIAS}
            placeholder="Selecione"
          />
        </FormField>

        <FormField label="Por que deseja fazer este curso?">
          <TextInput
            value={dadosFormulario.motivacao}
            onChangeText={(text) => handleInputChange('motivacao', text)}
            style={[styles.formInput, styles.formTextarea]}
            placeholder="Conte-nos sobre sua motivação..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </FormField>

        <View style={styles.formButtons}>
          <TouchableOpacity
            style={styles.cancelarButton}
            onPress={() => setMostrarFormulario(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelarButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmarButton}
            onPress={handleSubmitFormulario}
            activeOpacity={0.7}
          >
            <Text style={styles.confirmarButtonText}>Confirmar Inscrição</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const FiltroButton = ({ items, selected, onSelect, label }) => (
    <View style={styles.filtroRow}>
      <Text style={styles.filtroLabel}>{label}:</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtroScrollContent}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filtroButton,
              selected === item && styles.filtroButtonActive
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={[
              styles.filtroButtonText,
              selected === item && styles.filtroButtonTextActive
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.voltarButton} 
          onPress={handleVoltar} 
          activeOpacity={0.7}
        >
          <Text style={styles.voltarButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cursos Técnicos</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.filtrosContainer}>
        <FiltroButton 
          items={CATEGORIAS} 
          selected={filtroCategoria} 
          onSelect={setFiltroCategoria} 
          label="Categoria" 
        />
        <FiltroButton 
          items={NIVEIS} 
          selected={filtroNivel} 
          onSelect={setFiltroNivel} 
          label="Nível" 
        />
      </View>

      <FlatList
        data={cursosFiltrados}
        renderItem={({ item }) => <CursoCard curso={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cursosContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum curso encontrado com os filtros selecionados.</Text>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent
        visible={!!cursoSelecionado}
        onRequestClose={handleFecharDetalhes}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable 
                style={styles.fecharButton} 
                onPress={handleFecharDetalhes}
              >
                <Text style={styles.fecharButtonText}>✕</Text>
              </Pressable>
            </View>
            
            <ScrollView 
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContentContainer}
            >
              {!mostrarFormulario ? (
                <>
                  <View style={styles.modalCategorias}>
                    <View style={styles.cursoCategoria}>
                      <Text style={styles.cursoCategoriaText}>{cursoSelecionado?.categoria}</Text>
                    </View>
                    <View style={styles.cursoNivel}>
                      <Text style={styles.cursoNivelText}>{cursoSelecionado?.nivel}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.modalTitulo}>{cursoSelecionado?.titulo}</Text>
                  <Text style={styles.modalDescricao}>{cursoSelecionado?.descricao}</Text>
                  
                  <View style={styles.modalInfoGrid}>
                    {[
                      { label: 'Duração', value: cursoSelecionado?.duracao },
                      { label: 'Carga Horária', value: cursoSelecionado?.cargaHoraria },
                      { label: 'Modalidade', value: cursoSelecionado?.modalidade },
                      { label: 'Preço', value: cursoSelecionado?.preco, isPrice: true }
                    ].map((info, index) => (
                      <View key={index} style={styles.modalInfoItem}>
                        <Text style={styles.modalInfoLabel}>{info.label}</Text>
                        <Text style={info.isPrice ? styles.modalInfoPreco : styles.modalInfoValue}>
                          {info.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                  
                  <TouchableOpacity
                    style={styles.inscricaoButton}
                    onPress={() => setMostrarFormulario(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.inscricaoButtonText}>Fazer Inscrição</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <FormularioInscricao />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a0f2e' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20, 
    paddingTop: 50, 
    backgroundColor: '#1a0f2e', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
    zIndex: 1
  },
  voltarButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  voltarButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    textAlign: 'center',
    flex: 1 
  },
  placeholder: { 
    width: 70 
  },
  filtrosContainer: { 
    backgroundColor: '#1a0f2e', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(139, 92, 246, 0.1)' 
  },
  filtroRow: { 
    marginBottom: 15 
  },
  filtroLabel: { 
    fontSize: 15, 
    color: '#cccccc', 
    fontWeight: '500', 
    marginBottom: 10 
  },
  filtroScrollContent: { 
    paddingRight: 20 
  },
  filtroButton: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 10, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)' 
  },
  filtroButtonActive: { 
    backgroundColor: '#8b5cf6', 
    borderColor: '#8b5cf6' 
  },
  filtroButtonText: { 
    fontSize: 12, 
    color: '#ffffff', 
    fontWeight: '500' 
  },
  filtroButtonTextActive: { 
    color: '#ffffff', 
    fontWeight: '600' 
  },
  cursosContainer: { 
    padding: 25, 
    paddingBottom: 100 
  },
  cursoCard: { 
    backgroundColor: '#2a1f3d', 
    borderRadius: 15, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(139, 92, 246, 0.3)', 
    marginBottom: 40, 
    shadowColor: '#6E6EFF', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 5 
  },
  cursoHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  cursoCategoria: { 
    backgroundColor: 'rgba(198, 190, 216, 0.2)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12 
  },
  cursoCategoriaText: { 
    fontSize: 12, 
    color: '#9474FF', 
    fontWeight: '600' 
  },
  cursoNivel: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12 
  },
  cursoNivelText: { 
    fontSize: 12, 
    color: '#ffffff', 
    fontWeight: '500' 
  },
  cursoTitulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 10, 
    lineHeight: 24 
  },
  cursoDescricao: { 
    fontSize: 14, 
    color: '#cccccc', 
    lineHeight: 20, 
    marginBottom: 15 
  },
  cursoInfo: { 
    marginBottom: 15 
  },
  infoItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  infoLabel: { 
    fontSize: 14, 
    color: '#999999' 
  },
  infoValue: { 
    fontSize: 14, 
    color: '#ffffff', 
    fontWeight: '500' 
  },
  cursoFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 15, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(139, 92, 246, 0.2)' 
  },
  cursoPreco: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#8b5cf6' 
  },
  cursoCargaHoraria: { 
    fontSize: 14, 
    color: '#cccccc', 
    fontWeight: '500' 
  },
  emptyContainer: { 
    padding: 40, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  emptyText: { 
    color: '#cccccc', 
    fontSize: 16, 
    textAlign: 'center', 
    lineHeight: 24 
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)' 
  },
  modalContainer: { 
    backgroundColor: '#1a0f2e', 
    borderRadius: 20, 
    margin: 20, 
    maxHeight: '90%', 
    width: '90%', 
    maxWidth: 600, 
    borderWidth: 2, 
    borderColor: 'rgba(139, 92, 246, 0.3)' 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    padding: 20, 
    paddingBottom: 0 
  },
  modalContent: { 
    paddingHorizontal: 20 
  },
  modalContentContainer: { 
    paddingBottom: 30 
  },
  fecharButton: { 
    backgroundColor: 'rgba(139, 92, 246, 0.2)', 
    width: 35, 
    height: 35, 
    borderRadius: 35, 
    borderWidth: 1, 
    borderColor: 'rgba(139, 92, 246, 0.4)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  fecharButtonText: { 
    fontSize: 18, 
    color: '#ffffff', 
    fontWeight: 'bold' 
  },
  modalCategorias: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  modalTitulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 15, 
    lineHeight: 30 
  },
  modalDescricao: { 
    fontSize: 16, 
    color: '#cccccc', 
    lineHeight: 24, 
    marginBottom: 25 
  },
  modalInfoGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
  modalInfoItem: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'rgba(139, 92, 246, 0.2)', 
    width: '48%', 
    marginBottom: 10 
  },
  modalInfoLabel: { 
    fontSize: 12, 
    color: '#999999', 
    marginBottom: 5 
  },
  modalInfoValue: { 
    fontSize: 16, 
    color: '#ffffff', 
    fontWeight: '600' 
  },
  modalInfoPreco: { 
    fontSize: 18, 
    color: '#8b5cf6', 
    fontWeight: 'bold' 
  },
  inscricaoButton: { 
    backgroundColor: '#8b5cf6', 
    padding: 16, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },
  inscricaoButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#ffffff' 
  },
  formularioContainer: { 
    flex: 1, 
    paddingBottom: 20 
  },
  formulario: { 
    flex: 1 
  },
  formularioContent: { 
    paddingBottom: 30 
  },
  formularioTitulo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  formularioSubtitulo: { 
    fontSize: 16, 
    color: '#8b5cf6', 
    marginBottom: 25, 
    textAlign: 'center', 
    fontWeight: '500' 
  },
  formRow: { 
    flexDirection: 'row', 
    marginBottom: 20 
  },
  formGroup: { 
    flex: 1, 
    marginBottom: 20 
  },
  formLabel: { 
    fontSize: 14, 
    color: '#cccccc', 
    marginBottom: 8, 
    fontWeight: '500' 
  },
  requiredAsterisk: {
    color: '#ff0000'
  },
  formInput: { 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(139, 92, 246, 0.3)', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    color: '#ffffff', 
    fontSize: 14 
  },
  formTextarea: { 
    minHeight: 100, 
    textAlignVertical: 'top' 
  },
  pickerContainer: { 
    position: 'relative', 
    zIndex: 1 
  },
  pickerButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(139, 92, 246, 0.3)', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)' 
  },
  pickerText: { 
    color: '#ffffff', 
    fontSize: 14 
  },
  pickerPlaceholder: { 
    color: '#999' 
  },
  pickerArrow: { 
    color: '#8b5cf6', 
    marginLeft: 10 
  },
  pickerOptions: { 
    position: 'absolute', 
    top: '100%', 
    left: 0, 
    right: 0, 
    backgroundColor: '#2a1f3d', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'rgba(139, 92, 246, 0.3)', 
    marginTop: 5, 
    zIndex: 10 
  },
  pickerOption: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(139, 92, 246, 0.1)' 
  },
  pickerOptionText: { 
    color: '#ffffff', 
    fontSize: 14 
  },
  formButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  cancelarButton: { 
    flex: 1, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    padding: 16, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginRight: 10, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)' 
  },
  cancelarButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#ffffff' 
  },
  confirmarButton: { 
    flex: 1, 
    backgroundColor: '#8b5cf6', 
    padding: 16, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginLeft: 10 
  },
  confirmarButtonText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#ffffff' 
  }
});

export default CursosScreen;