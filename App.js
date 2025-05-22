import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ onMenuPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo da Augebit */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <View style={styles.logoShape1} />
          <View style={styles.logoShape2} />
          <View style={styles.logoShape3} />
        </View>
        <Text style={styles.logoText}>AUGEBIT</Text>
      </View>
      
      {/* Botão do Menu */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuIconContainer}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // Para o status bar
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
    position: 'relative',
  },
  logoShape1: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
    top: 0,
    left: 0,
    transform: [{ rotate: '45deg' }],
  },
  logoShape2: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#a78bfa',
    borderRadius: 2,
    top: 8,
    left: 16,
    transform: [{ rotate: '30deg' }],
    opacity: 0.8,
  },
  logoShape3: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#c4b5fd',
    borderRadius: 2,
    bottom: 0,
    left: 8,
    transform: [{ rotate: '15deg' }],
    opacity: 0.6,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  menuButton: {
    padding: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuIconContainer: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLine: {
    width: 20,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

export default Header;