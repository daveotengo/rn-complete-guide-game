import React ,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Button,Dimensions,ScrollView, TextInput,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';
import Card from '../components/Card';
import Color from '../constants/colors';
import Input from  '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import * as Font from 'expo-font';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
const StartGameScreen = props => {

    const[enteredNumber,setEnteredNumber]=useState('');
    const[confirmed,setConfirmed]=useState(false);
    const[selectedNumber,setSelectedNumber]=useState(0);
    const[ buttonWidth,setButtonWidth] = useState(Dimensions.get('window').width);

   
    const numberInputHandler = (inputText) => {
        setEnteredNumber(inputText.replace(/[^0-9]/g,''));
        //setEnteredNumber(inputText);

    };

    const resetInputHandler = () => {
        setEnteredNumber('');
        setConfirmed(false);
    };

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width/4);
    };

    useEffect(() => {
       
        dimensionsHandler=Dimensions.addEventListener('change',updateLayout);
    
        return () => dimensionsHandler.remove();

    }, [])

    const confirmedInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (chosenNumber===NaN || chosenNumber<=0 || chosenNumber > 99){
            Alert.alert(
            'Invalid Number!',
             'Number has to be a number between 1 to 99',
             [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
             )
            return
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber)

        setEnteredNumber('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if(confirmed){
        confirmedOutput =(
        <Card style={styles.card}>
            <Text>You Selected</Text>
            <NumberContainer  >{selectedNumber}</NumberContainer>
            <MainButton   onPress={()=> props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>
        )
    }

    return (
        <ScrollView >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback 
            onPress={()=>{ 
                Keyboard.dismiss();
            }}
        >
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start A New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText style={styles.text}>Select A Number</BodyText>
                <Input style={styles.input} onChangeText={numberInputHandler} value={enteredNumber} autoCapitalize='none' blurOnSubmit autoCorrect={false} keyboardType='numeric' maxLength={2} />
                <View style={styles.buttonContainer}>
                    <View style={buttonWidth}>
                        <Button title="Reset" onPress={() => { resetInputHandler}} color={Color.primary} />
                    </View>

                    <View style={buttonWidth}>
                        <Button title="Confirm" onPress={() =>  confirmedInputHandler() } color={Color.accent} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    screen: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginVertical: 10
    },

    inputContainer: {
        minWidth: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '100%',

    },
    // button:{
    //     width: Dimensions.get('window').width/3,
    //     //padding: 10
    // },
    input:{
        width:50,
        textAlign: 'center'
    },
    card:{
        marginTop: 20,
        alignItems: 'center'
    },
    text:{
        fontFamily: 'open-sans'
    },
  




});

export default StartGameScreen;
