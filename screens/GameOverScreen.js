import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions,ScrollView, 
    SafeAreaView,
    Button,Image, TextInput,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';


const GameOverScreen = props => {
    return(
        
        <ScrollView>
        <View style={styles.screen}>
           <TitleText>The Game is Over</TitleText> 
           <View style={styles.imageContainer}>
           <Image style={styles.image} resize='cover' 
           fadeDuration={300}
                source={require('../assets/images/gmo.png')}
                //source={{uri: 'https://www.pngarts.com/files/17/Game-Over-PNG-Free-Download.png'}}
            />
           </View>
           <View style={styles.resultContainer}>
           <BodyText style={styles.resultText}> Your Phone Needed
            <Text style={styles.highlight}> {props.roundsNumber}</Text> Rounds to Guess Number
            <Text style={styles.highlight}> {props.userNumber}</Text>
           </BodyText>
           </View>
           <MainButton onPress={props.onRestart} >New Game</MainButton>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
      
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: Dimensions.get('window').width*0.7,
        height: Dimensions.get('window').width*0.7,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,

    },

    highlight:{
        fontStyle: 'bold',
        fontSize: 20,
        //fontFamily: require('../assets/fonts/OpenSans/OpenSans-Italic.ttf') ,
        color: colors.accent,
    },

    resultContainer: {
        marginHorizontal: 30,
        marginVertical: (Dimensions.get('window').height < 400) ? 16 : 20
    },

    resultText:{
        textAlign: 'center',
        fontSize: 20,
    }



});

export default GameOverScreen;