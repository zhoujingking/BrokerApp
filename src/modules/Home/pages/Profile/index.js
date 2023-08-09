import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TouchableNativeFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBrokerEntityList, saveBrokerEntityList } from '../../../../dataStore/brokerRest';
import Icon from 'react-native-vector-icons/Ionicons';
import EntityModal from './EntityModal';


function Profile() {
  const [entityList, setEntityList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currEntity, setCurrEntity] = useState(null);

  useEffect(() => {
    getBrokerEntityList().then(list => {
      setEntityList(list);
    })
  }, []);

  const onEdit = item => {
    setCurrEntity(item);
    setIsModalVisible(true);
  }

  const onDelete = item => {
    setCurrEntity(null);
    Alert.alert('Warning', 'Are you sure to delete?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK', 
        onPress: () => {
          const list = entityList.filter(entity => entity.code !== item.code);
          setEntityList(list);
          saveBrokerEntityList(list);
        }
      },
    ])
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 6
      }}>
        <Text style={{
          flex: 1,
          fontSize: 24,
          color: '#2A66F6'
        }}
          numberOfLines={1}
        >
          {item.name}({item.code}.{item.tradeCenter})
        </Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <TouchableNativeFeedback onPress={() => onEdit(item)}>
            <Icon size={30} name="build" color="#2A66F6" />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => onDelete(item)}>
            <Icon size={30} name="trash" color="#E33632" />
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  };

  const ItemSeparatorComponent = () => {
    return <View style={{ height: 16 }} />
  }

  const onCreate = () => {
    setCurrEntity(null);
    setIsModalVisible(true);
  }

  const onCancel = () => {
    setIsModalVisible(false);
  }

  const onConfirm = (entity) => {
    setIsModalVisible(false);
    const resultList = entityList.concat(entity);
    setEntityList(resultList);
    saveBrokerEntityList(resultList);
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <FlatList
        style={{ flex: 1, marginTop: 12 }}
        data={entityList}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <Pressable style={{
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: '#2A66F6'
      }}
        onPress={onCreate}
      >
        <Text style={{
          fontSize: 20,
          color: 'white'
        }}>Create</Text>
      </Pressable>
      <EntityModal
        isVisible={isModalVisible}
        entity={currEntity}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </SafeAreaView>
  );
}
export default Profile;