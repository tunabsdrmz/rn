import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalStorage(key) {
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.warn(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.warn(e);
    }
    return null;
  };

  return {storeData, getData};
}

export function usePNStorage() {
  const {storeData, getData} = useLocalStorage('notification-key');

  const saveNotification = async notification => {
    try {
      let newArr = [notification];
      const data = await getData();

      if (data) newArr = [...newArr, ...data];

      await storeData(newArr);
    } catch (e) {
      console.warn(e);
    }
  };

  return {saveNotification, getData, storeData};
}

export const pnStorage = usePNStorage();

export function ascii_to_hexa(str) {
  let arr1 = [];

  for (let n = 0, l = str.length; n < l; n++) {
    let hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

export function hex_to_ascii(str1) {
  let hex = str1.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}
