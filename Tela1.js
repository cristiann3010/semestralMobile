// Tela1.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Tela1({ openMenu }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela 1</Text>
      <Button title="Abrir Menu" onPress={openMenu} />
    </View>
  );
}
