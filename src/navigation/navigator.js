import {ActivityIndicator, Linking} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreateScreen from '../main-screens/create-screen';
import NotificationScreen from '../main-screens/notification-screen';
import TextScreen from '../main-screens/home-screen/text-screen';
import ImageScreen from '../main-screens/home-screen/image-screen';
import YoutubeScreen from '../main-screens/home-screen/youtube-screen';
import {ascii_to_hexa} from '../utils/helper';
import ActiveHomeIcon from '../assets/svg/activeHome.svg';
import PassiveHomeIcon from '../assets/svg/passiveHome.svg';
import ActiveCreateIcon from '../assets/svg/activeCreate.svg';
import PassiveCreateIcon from '../assets/svg/passiveCreate.svg';
import ActiveNotificationIcon from '../assets/svg/activeNotification.svg';
import PassiveNotificationIcon from '../assets/svg/passiveNotification.svg';
import HomeScreen from '../main-screens/home-screen';

function buildDeepLinkFromNotificationData(remoteMessage) {
  const pnType = remoteMessage?.data.pn_type;
  if (pnType === '1') {
    return `cask://home/text/${remoteMessage.notification.title}/${remoteMessage.notification.body}`;
  }
  if (pnType === '2') {
    return `cask://home/image/${ascii_to_hexa(remoteMessage.data.img_url)}`;
  }
  if (pnType === '3') {
    return `cask://home/youtube/${ascii_to_hexa(
      remoteMessage.data.youtube_url,
    )}`;
  }
  return null;
}

const linking = {
  prefixes: ['cask://'],
  config: {
    initialRouteName: 'create',
    screens: {
      homeTab: {
        screens: {
          text: {
            path: 'home/text/:title/:body',
          },
          image: {
            path: 'home/image/:url_hex',
          },
          youtube: {
            path: 'home/youtube/:url_hex',
          },
        },
      },
      create: 'create',
      notifications: 'notifications',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="text" component={TextScreen} />
      <Stack.Screen name="image" component={ImageScreen} />
      <Stack.Screen name="youtube" component={YoutubeScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="create"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}>
      <Tab.Screen
        name="homeTab"
        component={StackNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ActiveHomeIcon /> : <PassiveHomeIcon />,
        }}
      />
      <Tab.Screen
        name="create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ActiveCreateIcon /> : <PassiveCreateIcon />,
        }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <ActiveNotificationIcon /> : <PassiveNotificationIcon />,
        }}
      />
    </Tab.Navigator>
  );
}

export function Navigator() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator animating />}>
      <TabNavigator />
    </NavigationContainer>
  );
}
