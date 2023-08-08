import axios from 'axios';
import entityList from './broker/entityList.json'

const getBrokerEntityList = async () => {
  return entityList;
}

export {
  getBrokerEntityList
}