import {View, Image} from 'react-native';
import React from 'react';
import {hex_to_ascii} from '../../../utils/helper';
import {useRoute} from '@react-navigation/native';

export default function ImageScreen() {
  const {
    params: {url_hex},
  } = useRoute();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}>
      <Image
        source={{uri: hex_to_ascii(url_hex)}}
        style={{width: 300, height: 300, borderRadius: 8}}
        alt="image"
      />
    </View>
  );
}
