import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import messaging from '@react-native-firebase/messaging';
import {createNotification} from '../../service/create';

export default function CreateScreen() {
  const [delay, setDelay] = React.useState();
  const [type, setType] = React.useState();
  const [token, setToken] = React.useState('');

  const handleSend = async () => {
    if (!delay || !type) return;
    try {
      await createNotification(token, type, delay);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      setToken(fcmToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
      }}>
      {token === '' ? (
        <ActivityIndicator size="large" color="#40C9A2" />
      ) : (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            width: '70%',
          }}>
          <Text style={{fontSize: 14, fontWeight: '500', color: '#454545'}}>
            FCM Token:
            <Text style={{fontSize: 12, fontWeight: '400', color: '#454545'}}>
              {token}
            </Text>
          </Text>
          <View
            style={{
              borderColor: '#454545',
              borderWidth: 1,
              borderRadius: 8,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Picker
              mode="dropdown"
              selectedValue={type}
              onValueChange={value => setType(value)}
              itemStyle={{
                fontWeight: 400,
                fontSize: 14,
                color: '#454545',
              }}
              style={{
                height: 36,
                padding: 8,
                width: '100%',
              }}>
              <Picker.Item
                label="Just Text"
                value="1"
                style={{fontWeight: 400, fontSize: 14, color: '#454545'}}
              />
              <Picker.Item
                label="Image URL"
                value="2"
                style={{fontWeight: 400, fontSize: 14, color: '#454545'}}
              />
              <Picker.Item
                label="Youtube URL"
                value="3"
                style={{fontWeight: 400, fontSize: 14, color: '#454545'}}
              />
            </Picker>
          </View>
          <TextInput
            style={{
              height: 36,
              borderColor: '#454545',
              borderWidth: 1,
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
              width: '100%',
            }}
            placeholder="Delay (seconds)"
            keyboardType="numeric"
            onChangeText={newDelay => setDelay(newDelay)}
            defaultValue={delay}
          />

          <Pressable
            disabled={!token}
            onPress={handleSend}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#2D896F' : '#40C9A2',
                padding: 8,
                borderRadius: 6,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              },
            ]}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 500,
                textAlign: 'center',
              }}>
              Send
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
