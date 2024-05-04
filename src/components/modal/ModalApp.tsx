import {StyleSheet, Modal, View, StyleProp, ViewStyle, ModalBaseProps} from 'react-native';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  modalProps?: ModalBaseProps;
}

const ModalApp = ({children, style, modalProps}: ModalProps) => {
  return (
    <Modal transparent {...modalProps}>
      <View style={styles.transparentContainer}>
        <View style={[styles.container, style]}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalApp;

const styles = StyleSheet.create({
  transparentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
