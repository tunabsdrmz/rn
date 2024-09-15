import React from 'react';
import {Text, View} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: '#454545'}}>
        Home Screen
      </Text>
    </View>
  );
}
