import {SafeAreaView, StatusBar, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import Notification from '../../components/Notification';
import {pnStorage} from '../../utils/helper';
import {FlashList} from '@shopify/flash-list';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    const data = await pnStorage.getData();
    setNotifications(data || []);
    setLoading(false);
  };
  return (
    <SafeAreaView
      style={{flex: 1, marginTop: StatusBar.currentHeight || 0, padding: 16}}>
      <FlashList
        data={notifications}
        renderItem={({item}) => <Notification item={item} />}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getNotifications} />
        }
      />
    </SafeAreaView>
  );
}
