import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Modal, View, Pressable, TouchableOpacity, Text } from 'react-native';

//Styles
import ModalStyles from '../styles/ModalStyles';
import Theme from '../styles/Theme';
export default function CustomModal({ visible, closeModal, children, label }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}

        >
            <View style={ModalStyles.mainContainer}>
                <View style={ModalStyles.mainContainerContent}>
                    <View style={ModalStyles.containerClose}>
                        <Text style={ModalStyles.labelText}>{label}</Text>
                        <TouchableOpacity onPress={closeModal} style={ModalStyles.closeButton}>
                            <AntDesign name="close" size={24} color={Theme.Colors.white} />
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
                <Pressable onPress={closeModal} style={ModalStyles.backgroundContainer} />
            </View>
        </Modal>
    );
}