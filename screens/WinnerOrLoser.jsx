import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


//Styles
import DefaultStyles from '../styles/DefaultStyles';
import Theme from '../styles/Theme';

//Components
import ButtonCustomized from '../components/ButtonCustomized';
import CustomModal from '../components/CustomModal';

export default function WinnerOrLoser({ navigation, route }) {
    const { palavraEscolhida, tentativa, action } = route.params;
    const [visibleModal, setVisibleModal] = useState(false);

    const onPressJogarNovamente = () => {
        setVisibleModal(true);
    }
    const onPressOption = (letras) => {
        navigation.push("Game", { letras: letras });
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                title: action == "Winner" ? "Ganhou" : "Perdeu"
            })
        });

        return unsubscribe;
    }, []);
    return (
        <View style={DefaultStyles.containerWinnerAndLoserApp}>
            <CustomModal visible={visibleModal} closeModal={() => setVisibleModal(!visibleModal)} label={"Escolha o modo"}>
                <View style={DefaultStyles.containerOptionsModalHome}>
                    <ButtonCustomized style={{ margin: 4, padding: 3 }} label={"4 Letras"} backgroundColor={"secondary"} onPress={() => onPressOption(4)} />
                    <ButtonCustomized style={{ margin: 4, padding: 3 }} label={"5 Letras"} backgroundColor={"secondary"} onPress={() => onPressOption(5)} />
                    <ButtonCustomized style={{ margin: 4, padding: 3 }} label={"6 Letras"} backgroundColor={"secondary"} onPress={() => onPressOption(6)} />
                </View>
            </CustomModal>
            <AntDesign name={action == "Winner" ? "Trophy" : "closecircle"} size={80} color={Theme.Colors.white} />
            <Text style={[DefaultStyles.titleWinnerAndLoser, DefaultStyles.titleWinnerAndLoserColor(action == "Winner" ? "success" : "danger")]}>{action == "Winner" ? "Parabéns!" : "Você errou!"}</Text>
            {action == "Winner" ?
                <Text style={[DefaultStyles.textWinnerAndLoser]}>Você acertou na {tentativa}ª tentativa</Text>
                : <></>
            }
            <Text style={[DefaultStyles.textWinnerAndLoser]}>A palavra era: </Text>
            <Text style={[DefaultStyles.titleWinnerAndLoser, DefaultStyles.titleWinnerAndLoserColor(action == "Winner" ? "success" : "danger")]}>{palavraEscolhida}</Text>
            <ButtonCustomized onPress={onPressJogarNovamente} style={{ width: "60%", justifyContent: "center", padding: 2 }} icon={<AntDesign name="sync" size={16} color={Theme.Colors.white} />} label={<>Jogar novamente</>} backgroundColor={"gray"} />
        </View>
    )
}