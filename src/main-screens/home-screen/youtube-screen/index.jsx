import {View} from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useRoute} from '@react-navigation/native';
import {hex_to_ascii} from '../../../utils/helper';
export default function YoutubeScreen() {
  const {
    params: {url_hex},
  } = useRoute();

  const getYoutubeVideoIdFromUrl = url => {
    var temp = url.replace('https://youtu.be/', '');
    temp = temp.replace('https://www.youtube.com/watch?v=', '');
    return temp.substring(0, 11);
  };
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
      }}>
      <YoutubePlayer
        height={360}
        videoId={getYoutubeVideoIdFromUrl(hex_to_ascii(url_hex))}
        width={'90%'}
      />
    </View>
  );
}
