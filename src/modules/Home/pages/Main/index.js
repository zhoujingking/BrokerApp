import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EntityKGraph from '../../../../core/EntityKGraph';
import { getBrokerEntityList } from '../../../../dataStore/brokerRest';

function Main(props) {
  const [entityList, setEntityList] = useState([]);

  useEffect(() => {
    getBrokerEntityList().then(data => {
      setEntityList(data);
    })
  }, []);

  const renderItem = ({ item }) => {
    return (
      <EntityKGraph 
        containerStyle={{height: 200}}
        type="daily"
        code={item.code}
        tradeCenter={item.tradeCenter}
      />
    )
  };

  const SeperatorComp = () => {
    return <View style={{height: 16}}/>
  }
  
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <FlatList 
        data={entityList}
        renderItem={renderItem}
        ItemSeparatorComponent={SeperatorComp}
      />
    </SafeAreaView>
  );
}

export default Main;