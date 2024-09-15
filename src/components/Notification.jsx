import {View, Text, Pressable} from 'react-native';
import moment from 'moment';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ascii_to_hexa} from '../utils/helper';

export default function Notification({item}) {
  const navigation = useNavigation();

  const openNotificationScreen = () => {
    if (item.data.pn_type == 1) {
      navigation.navigate('homeTab', {
        screen: 'text',
        params: {
          title: item.notification.title,
          body: item.notification.body,
        },
      });
    } else if (item.data.pn_type == 2) {
      navigation.navigate('homeTab', {
        screen: 'image',
        params: {
          url_hex: ascii_to_hexa(item.data.img_url),
        },
      });
    } else if (item.data.pn_type == 3) {
      navigation.navigate('homeTab', {
        screen: 'youtube',
        params: {
          url_hex: ascii_to_hexa(item.data.youtube_url),
        },
      });
    }
  };

  return (
    <Pressable
      onPress={openNotificationScreen}
      style={{
        height: 74,
        backgroundColor: '#E7E7E7',
        borderRadius: 12,
        padding: 12,
        flex: 1,
        gap: 4,
        marginVertical: 5,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#454545'}}>
          {item.notification.title || 'Notification Title'}
        </Text>
        <Text style={{fontSize: 10, fontWeight: '600', color: '#454545'}}>
          {moment(item.sentTime).format('DD/MM/YYYY')}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '400',
          color: '#454545',
          maxWidth: 300,
        }}>
        {item.notification.body || 'Notification Body'}
      </Text>
    </Pressable>
  );
}
