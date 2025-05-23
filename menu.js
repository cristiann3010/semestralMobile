
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Menu = ({ visible, onClose, navigation }) => {
  const slideAnim = React.useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleCursosTecnicos = () => {
    console.log('Cursos Técnicos pressionado');
    onClose(); // Fecha o menu primeiro
    
    // Navega para a tela de Cursos
    if (navigation) {
      navigation.navigate('Cursos'); // ou 'CursosTecnicos' dependendo do nome da sua rota
    }
  };

  const handleCandidatos = () => {
    console.log('Candidatos pressionado');
    onClose();
  };

  const handleBlog = () => {
    console.log('Blog pressionado');
    onClose();
  };

  const handleAdministracao = () => {
    console.log('Administração pressionado');
    onClose();
  };

  const handleLogin = () => {
    console.log('Login pressionado');
    onClose();
  };

  const handleCadastro = () => {
    console.log('Cadastre-se pressionado');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        {/* Área clicável para fechar o menu */}
        <TouchableOpacity 
          style={styles.overlayTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
        
        {/* Menu lateral */}
        <Animated.View 
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          {/* Gradiente de fundo decorativo */}
          <View style={styles.backgroundGradient} />
          
          {/* Botão de fechar (X) */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>✕</Text>
            </View>
          </TouchableOpacity>

          {/* Conteúdo do Menu */}
          <View style={styles.menuContent}>
            
            {/* Título do Menu */}
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>MENU</Text>
              <View style={styles.menuHeaderLine} />
            </View>
            
            {/* Opções do Menu */}
            <View style={styles.menuItems}>
              
              {/* Cursos Técnicos */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleCursosTecnicos}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconWrapper}>
                    <Text style={styles.menuIcon}>🎓</Text>
                  </View>
                  <Text style={styles.menuItemText}>Cursos Técnicos</Text>
                  <Text style={styles.menuArrow}>→</Text>
                </View>
                <View style={styles.menuItemBorder} />
              </TouchableOpacity>

              {/* Candidatos */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleCandidatos}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconWrapper}>
                    <Text style={styles.menuIcon}>👥</Text>
                  </View>
                  <Text style={styles.menuItemText}>Candidatos</Text>
                  <Text style={styles.menuArrow}>→</Text>
                </View>
                <View style={styles.menuItemBorder} />
              </TouchableOpacity>

              {/* Blog */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleBlog}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconWrapper}>
                    <Text style={styles.menuIcon}>📝</Text>
                  </View>
                  <Text style={styles.menuItemText}>Blog</Text>
                  <Text style={styles.menuArrow}>→</Text>
                </View>
                <View style={styles.menuItemBorder} />
              </TouchableOpacity>

              {/* Administração */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleAdministracao}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconWrapper}>
                    <Text style={styles.menuIcon}>⚙️</Text>
                  </View>
                  <Text style={styles.menuItemText}>Administração</Text>
                  <Text style={styles.menuArrow}>→</Text>
                </View>
                <View style={styles.menuItemBorder} />
              </TouchableOpacity>

            </View>

            {/* Seção de Botões */}
            <View style={styles.buttonsSection}>
              
              {/* Botão Login */}
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Fazer Login</Text>
              </TouchableOpacity>

              {/* Botão Cadastre-se */}
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={handleCadastro}
                activeOpacity={0.8}
              >
                <View style={styles.registerButtonGradient}>
                  <Text style={styles.registerButtonText}>Cadastre-se</Text>
                </View>
              </TouchableOpacity>

            </View>

            {/* Rodapé do Menu */}
            <View style={styles.menuFooter}>
              <Text style={styles.menuFooterText}>AUGEBIT © 2025</Text>
              <Text style={styles.menuFooterSubtext}>Versão 1.0</Text>
            </View>

          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    width: width * 0.85, // 85% da largura da tela
    maxWidth: 380,
    backgroundColor: '#1a0f2e',
    height: height + (StatusBar.currentHeight || 0), // Altura total incluindo status bar
    paddingTop: (StatusBar.currentHeight || 0) + 50,
    borderRightWidth: 2,
    borderRightColor: 'rgba(139, 92, 246, 0.3)',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 0) + 15,
    right: 20,
    zIndex: 10,
  },
  closeButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  menuHeader: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  menuHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 3,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  menuHeaderLine: {
    width: 60,
    height: 3,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  menuItems: {
    flex: 1,
    paddingTop: 50,
  },
  menuItem: {
    marginBottom: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  menuIconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuItemText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },
  menuArrow: {
    fontSize: 18,
    color: '#8b5cf6',
    fontWeight: 'bold',
  },
  menuItemBorder: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    marginHorizontal: 20,
  },
  buttonsSection: {
    paddingVertical: 30,
    gap: 18,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8b5cf6',
    fontFamily: 'Poppins-SemiBold',
  },
  registerButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  registerButtonGradient: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 30,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
  },
  menuFooter: {
    alignItems: 'center',
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
    paddingTop: 25,
  },
  menuFooterText: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  menuFooterSubtext: {
    fontSize: 12,
    color: '#cccccc',
    fontFamily: 'Poppins-Regular',
  },
});

export default Menu;