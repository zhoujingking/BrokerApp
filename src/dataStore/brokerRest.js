import entityList from './broker/entityList.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BROKER_KEY = 'BROKER_KEY';

const saveBrokerEntityList = async entityList => {
  return AsyncStorage.setItem(BROKER_KEY, JSON.stringify(entityList));
}

const getBrokerEntityList = async () => {
  const brokerEntityStr = await AsyncStorage.getItem(BROKER_KEY);
  if (!brokerEntityStr) {
    // save it to storage
    saveBrokerEntityList(entityList);
    return entityList;
  }
  return JSON.parse(brokerEntityStr);
};

export {
  getBrokerEntityList,
  saveBrokerEntityList,
}