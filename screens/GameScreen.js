import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView,FlatList, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import {  ScreenOrientation } from 'expo';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View  style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText> {itemData.item}</BodyText>
    </View>
);


const GameScreen = (props) => {

    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props;
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );

    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

    const updateLayout = () => {

        if(Dimensions.get('window ') > 600){
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

     

    }

    useEffect(()=>{

      

        updateLayoutHandler= Dimensions.addEventListener('change',updateLayout);

        return () => {
            updateLayoutHandler.remove();
        };

    });

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Don\'t lie',
                'You know that is wrong',
                [{ text: 'Sorry', style: 'cancel' }]
            );
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        //setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNum.toString(), ...curPastGuesses])
    };

    let listContainerStyle= styles.listContainer;
    
    if(availableDeviceWidth > 350 ){
        listContainerStyle =  styles.listContainerBig;
    }

    if(availableDeviceHeight < 500 ){
        return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            
                <View style={styles.controls}>
                    <MainButton title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>

                    <MainButton title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name="md-remove" size={24} color="white" />

                    </MainButton>
                </View>
             
      
            <View style={styles.listContainer}>
            <FlatList contentContainerStyle={styles.list} keyExtractor={(item)=>item} data={pastGuesses} renderItem={renderListItem.bind(this,pastGuesses.length)} />
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index ))}
                    </ScrollView> */}
                </View>
        </View>);
    }


    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card >
                <View style={styles.buttonContainer}>
                    <MainButton title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                    <MainButton title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name="md-remove" size={24} color="white" />

                    </MainButton>
                </View>
             
            </Card>
            <View style={styles.listContainer}>
            <FlatList contentContainerStyle={styles.list} keyExtractor={(item)=>item} data={pastGuesses} renderItem={renderListItem.bind(this,pastGuesses.length)} />
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index ))}
                    </ScrollView> */}
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 1,
        alignItems: 'center',
        
        marginTop: 50
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    },

    controls:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width:'80%',
    },
  
    listItem: {
        borderColor:'#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',

    },

    list:{
       //alignItems: 'center',
       justifyContent: 'flex-end',
       flexGrow:1,
    },

    listContainer:{
        width: '60%' ,
        flex: 1,

    },

    listContainerBig:{
        width: '80%',
        flex: 1,

    }
});

export default GameScreen;