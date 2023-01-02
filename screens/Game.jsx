import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Dimensions } from "react-native";

//Style
import DefaultStyles from '../styles/DefaultStyles';

//Components
import ButtonGame from '../components/ButtonGame';
import ButtonCustomized from '../components/ButtonCustomized';

import palavrasGame from '../database/palavras.json';

const { width, height } = Dimensions.get("screen");
export default function Game({ navigation, route }) {

    //Quantidade de letras escolhidas para a palavra
    const { letras } = route.params;
    const palavrasParaJogar = palavrasGame.value.split(" ");
    const palavrasFiltradas = palavrasParaJogar.filter(value => value.length == letras
        && !(/\W|_/).test(value)
        && value != ""
        && value !== value.toUpperCase())

    //Quantidade de letras escolhidas
    const [palavraEscolhida, setPalavraEscolhida] = useState("");

    //Função que pesquisa palavra para jogar
    const searchPalavra = () => {
        const palavraPesquisada = palavrasFiltradas[Math.floor(Math.random() * ((palavrasFiltradas.length - 1) - 0) + 0)];
        if (!palavraPesquisada) {
            searchPalavra();
        } else {
            setPalavraEscolhida(palavraPesquisada);
        }
    }

    //Quantidade de tentativas do jogador
    const tentativas = 6;

    //indexes das colunas e linhas do jogo
    const [colunas, setColunas] = useState([]);
    const [linhas, setLinhas] = useState([]);

    //index da linha que esta ativa no jogo
    const [linhaAtiva, setLinhaAtiva] = useState(0);

    //index da coluna selecionada
    const [colunaSelecionada, setColunaSelecionada] = useState(null);

    //Valores salvos 
    const [palavras, setPalavras] = useState([]);
    //letras do teclado
    const [teclado, setTeclado] = useState([
        [
            { label: "Q", backgroundColor: "primary" },
            { label: "W", backgroundColor: "primary" },
            { label: "E", backgroundColor: "primary" },
            { label: "R", backgroundColor: "primary" },
            { label: "T", backgroundColor: "primary" },
            { label: "Y", backgroundColor: "primary" },
            { label: "U", backgroundColor: "primary" },
            { label: "I", backgroundColor: "primary" },
            { label: "O", backgroundColor: "primary" },
            { label: "P", backgroundColor: "primary" },
        ],
        [
            { label: "A", backgroundColor: "primary" },
            { label: "S", backgroundColor: "primary" },
            { label: "D", backgroundColor: "primary" },
            { label: "F", backgroundColor: "primary" },
            { label: "G", backgroundColor: "primary" },
            { label: "H", backgroundColor: "primary" },
            { label: "J", backgroundColor: "primary" },
            { label: "K", backgroundColor: "primary" },
            { label: "L", backgroundColor: "primary" },
        ],
        [
            { label: "Z", backgroundColor: "primary" },
            { label: "X", backgroundColor: "primary" },
            { label: "C", backgroundColor: "primary" },
            { label: "V", backgroundColor: "primary" },
            { label: "B", backgroundColor: "primary" },
            { label: "N", backgroundColor: "primary" },
            { label: "M", backgroundColor: "primary" },
            { label: <Feather name="delete" size={width / 30} color="#FFF" />, backgroundColor: "primary", delete: true },
        ],
    ])

    //Função acionada ao clicar em um botão do teclado
    const onPresstButtonTeclado = (letra) => {
        if (colunaSelecionada != null) {
            const valor = palavras[linhaAtiva];
            if (letra.delete) {
                valor[colunaSelecionada] = "";
                setColunaSelecionada(prev => {
                    if (prev > 0) {
                        return prev - 1;
                    }
                    return prev;
                })
            } else {
                valor[colunaSelecionada] = letra.label;
                setColunaSelecionada(prev => {
                    if (prev < letras - 1) {
                        return prev + 1;
                    }
                    return null;
                })
            }
            setPalavras(palavras.map((value, index) => {
                if (index == linhaAtiva) {
                    return valor;
                } else {
                    return value;
                }
            }))
        }
    }

    //Função que set a coluna selecionada
    const onPressButtonGame = (linha, coluna) => {
        if (linha == linhaAtiva)
            setColunaSelecionada(coluna);
    }

    //Função que faz o controle para passar para a proxima palavra
    const onPressButtonEnviar = () => {

        const palavraInformada = palavras[linhaAtiva].join("");

        if (palavraInformada.length == letras) {
            if (palavrasParaJogar.filter(value => value.toUpperCase() == palavraInformada).length > 0) {
                if (palavraInformada == palavraEscolhida.toUpperCase()) {
                    navigation.push("Home");
                    navigation.push("WinnerOrLoser", { palavraEscolhida: palavraEscolhida, tentativa: linhaAtiva + 1, action: "Winner" });
                }

                setLinhaAtiva(prev => {
                    if (prev < tentativas - 1) {
                        const _teclado = teclado.map(linha => {
                            const _linha = linha.map(coluna => {
                                if (coluna.backgroundColor != "success") {
                                    if (palavras[linhaAtiva].filter((value, index) => coluna.label == value && palavraEscolhida.toUpperCase()[index] == value).length > 0) {
                                        coluna.backgroundColor = "success";
                                    } else if (palavras[linhaAtiva].filter((value) => coluna.label == value && colunas.filter(f => palavraEscolhida.toUpperCase()[f] == value).length > 0).length > 0) {
                                        coluna.backgroundColor = "warning";
                                    } else if (palavras[linhaAtiva].filter((value) => coluna.label == value && colunas.filter(f => palavraEscolhida.toUpperCase()[f] == value).length == 0).length > 0) {
                                        coluna.backgroundColor = "danger";
                                    }
                                }
                                return coluna;
                            });
                            return _linha;
                        })
                        setTeclado(_teclado);
                        return prev + 1;
                    }
                    else {
                        navigation.push("Home");
                        navigation.push("WinnerOrLoser", { palavraEscolhida: palavraEscolhida, tentativa: linhaAtiva + 1, action: "Loser" });
                        return prev;
                    }
                });

            } else {
                Alert.alert("Aviso!", "A palavra informada não esta presente no banco de dados");
            }
        } else {
            Alert.alert("Aviso!", "Existem campos vazios faltando");
        }
    }

    const getColorLetter = (linha, coluna) => {
        const palavraEscolhidaVetor = colunas.map(value => {
            return palavraEscolhida && palavraEscolhida[value].toUpperCase();
        })
        if (linha == linhaAtiva) {
            return "secondary";
        }

        if (palavras[linha][coluna] == palavraEscolhidaVetor[coluna]) {
            return "success";
        }
        if (palavraEscolhidaVetor.filter(value => {
            return value == palavras[linha][coluna];
        }).length > 0) {
            return "warning";
        }
        if (palavraEscolhidaVetor.filter(value => {
            return value == palavras[linha][coluna] || palavras[linha][coluna] == "";
        }).length == 0) {
            return "danger";
        }

        return "primary";
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            searchPalavra();
            setLinhaAtiva(0);
            const _colunas = [];
            const _linhas = [];
            const _palavras = [];
            for (let i = 0; i < letras; i++) {
                _colunas.push(i);
            }
            for (let i = 0; i < tentativas; i++) {
                _linhas.push(i);
            }
            for (let i = 0; i < tentativas; i++) {
                _palavras.push(_colunas.map(value => ""));
            }
            setLinhas(_linhas),
                setColunas(_colunas);
            setPalavras(_palavras);

        });

        return unsubscribe;
    }, []);

    return (
        <View style={DefaultStyles.mainContainerApp}>
            <View>
                {linhas.map(linha => {
                    return (
                        <View key={linha} style={DefaultStyles.linhaContainer}>

                            {colunas.map(coluna => {
                                return (
                                    <ButtonGame
                                        label={palavras.length > 0 ? palavras[linha][coluna] : ""}
                                        selected={linha == linhaAtiva && colunaSelecionada == coluna}
                                        onPress={() => onPressButtonGame(linha, coluna)} key={coluna}
                                        letras={letras}
                                        backgroundColor={getColorLetter(linha, coluna)}
                                    />
                                )
                            })}
                        </View>
                    );
                })}
            </View>
            <View style={DefaultStyles.tecladoGame}>
                {teclado.map(linha => {
                    return (
                        <View style={DefaultStyles.linhaTeclado}>
                            {
                                linha.map((coluna, index) => {
                                    return <ButtonCustomized key={index} onPress={() => onPresstButtonTeclado(coluna)} style={{ margin: 2, marginTop: 6, padding: 1, width: width / 12 }} labelStyle={{ fontSize: width / 30, alignText: "center", width: "100%" }} label={coluna.label} backgroundColor={coluna.backgroundColor} />
                                })
                            }
                        </View>
                    )
                })}
                <ButtonCustomized onPress={onPressButtonEnviar} style={{ margin: 2, marginTop: 6, padding: 1, width: "70%", justifyContent: "center" }} label={"ENVIAR"} backgroundColor={'primary'} />
            </View>
        </View>
    )
}