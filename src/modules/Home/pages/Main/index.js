import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EntityKGraph from '../../../../core/EntityKGraph';
import { getBrokerEntityList } from '../../../../dataStore/brokerRest';
import { TabView } from 'react-native-tab-view';

const WIDTH = Dimensions.get('screen').width;

const routes = [
  {
    key: 'min',
    title: '分K'
  },
  {
    key: 'daily',
    title: '日K'
  },
  {
    key: 'weekly',
    title: '周K'
  },
  {
    key: 'monthly',
    title: '月K'
  },
]

function Main(props) {
  const [entityList, setEntityList] = useState([]);
  const [index, setIndex] = useState(1);
  const isRefreshing = false;

  useEffect(() => {
    getBrokerEntityList().then(data => {
      setEntityList(data);
    })
  }, []);

  const onRefresh = () => {
    getBrokerEntityList().then(data => {
      setEntityList(data);
    })
  }

  const renderItem = ({ item }, type) => {
    return (
      <EntityKGraph
        containerStyle={{
          width: WIDTH,
          height: 200
        }}
        type={type}
        code={item.code}
        tradeCenter={item.tradeCenter}
      />
    )
  };

  const SeperatorComp = () => {
    return <View style={{ height: 16 }} />
  }

  const onIndexChange = index => {
    setIndex(index);
  }

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <TabView
        style={{
          flex: 1,
        }}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          return (
            <View style={{
              paddingTop: 20
            }}>
              <FlatList
                data={entityList}
                renderItem={(event) => renderItem(event, route.key)}
                ItemSeparatorComponent={SeperatorComp}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            </View>
          )
        }}
        onIndexChange={onIndexChange}
      />
    </SafeAreaView>
  );
}

export default Main;