import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function TextScreen() {
  const {
    params: {title, body},
  } = useRoute();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}>
      <Text
        style={{
          color: '#454545',
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
        }}>
        {title || 'No title'}
      </Text>
      <Text
        style={{
          color: '#454545',
          fontSize: 16,
          fontWeight: 400,
          maxWidth: '90%',
          textAlign: 'center',
        }}>
        {body || 'No body'}
      </Text>
    </View>
  );
}
