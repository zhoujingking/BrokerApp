import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";

const emptyEntity = {
  name: '',
  code: '',
  tradeCenter: ''
};

function EntityModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.isVisible);
  const [entity, setEntity] = useState(emptyEntity);

  useEffect(() => {
    setIsModalVisible(props.isVisible);
  }, [props.isVisible]);

  useEffect(() => {
    setEntity(props.entity || emptyEntity);
  }, [props.entity]);

  const onCancel = () => {
    setIsModalVisible(false);
    props.onCancel && props.onCancel();
  }

  const onConfirm = () => {
    if (!entity.name || !entity.code || !['sh', 'sz'].includes(entity.tradeCenter)) {
      alert('验证错误');
      return;
    }
    setIsModalVisible(false);
    props.onConfirm && props.onConfirm(entity);
  }

  const onNameChange = name => {
    setEntity(obj => ({...obj, name}))
  }
  const onCodeChange = code => {
    setEntity(obj => ({...obj, code}))
  }
  const onTradeCenterChange = tradeCenter => {
    setEntity(obj => ({...obj, tradeCenter}))
  }

  return (
    <Modal isVisible={isModalVisible}>
      <View style={{
        padding: 24,
        backgroundColor: 'white'
      }}>
        {/* header */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold'
        }}>Create New Entity</Text>

        <View style={{ marginVertical: 16 }}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={{
            padding: 12,
            backgroundColor: '#F4F5F6'
          }}
            value={entity.name}
            onChangeText={onNameChange}
          />
          <Text style={styles.label}>Code:</Text>
          <TextInput style={{
            padding: 12,
            backgroundColor: '#F4F5F6'
          }}
            value={entity.code}
            onChangeText={onCodeChange}
          />
          <Text style={styles.label}>Trade center:</Text>
          <TextInput style={{
            padding: 12,
            backgroundColor: '#F4F5F6'
          }}
            autoCapitalize={'none'}
            value={entity.tradeCenter}
            onChangeText={onTradeCenterChange}
          />
        </View>

        {/* footer */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}>
          <Pressable
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: '#A5A8AF'
            }}
            onPress={onCancel}
          >
            <Text style={{
              color: 'white'
            }}>Cancel</Text>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: '#2A66F6'
            }}
            onPress={onConfirm}
          >
            <Text style={{
              color: 'white'
            }}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20
  }
})

EntityModal.defaultProps = {
  isVisible: false
};
EntityModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  entity: PropTypes.object
};
export default EntityModal;