import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import Theme from '../styles/Theme';

import { View, Text } from 'react-native';

//Styles
import DefaultStyles from '../styles/DefaultStyles';

//Components
import ButtonCustomized from '../components/ButtonCustomized';
import CustomModal from '../components/CustomModal';

export default function Home({ navigation, route }) {

    //Estado de controle da visibilidade do modal
    const [visibleModal, setVisibleModal] = useState(false);

    const onPressOption = (qtd) => {
        setVisibleModal(false);
        navigation.push("Game", { letras: qtd });
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                title: "Tela Inicial"
            })
        });

        return unsubscribe;
    }, []);
    return (
        <View style={DefaultStyles.mainContainerApp}>
            <CustomModal visible={visibleModal} closeModal={() => setVisibleModal(!visibleModal)} label={"Escolha o modo"}>
                <View style={DefaultStyles.containerOptionsModalHome}>
                    <ButtonCustomized label={"4 Letras"} backgroundColor={"secondary"} onPress={() => onPressOption(4)} />
                    <ButtonCustomized label={"5 Letras"} backgroundColor={"secondary"} onPress={() => onPressOption(5)} />
                    <ButtonCustomized label={"6 Letras"} backgroundColor={"secondary"} onPress={() => onPressOption(6)} />
                </View>
            </CustomModal>
            <ButtonCustomized label={"Jogar"} icon={<Entypo name="game-controller" size={24} color={Theme.Colors['white']} />} onPress={() => setVisibleModal(true)} />

        </View>
    )
}