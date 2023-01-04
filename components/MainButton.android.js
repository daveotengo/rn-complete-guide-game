import React from 'react';
import {View,Button,Text,
    TouchableNativeFeedback,
    Platform,
     TouchableOpacity,StyleSheet} from 'react-native';
import colors from '../constants/colors'

const MainButton = props => {

    let ButtonComponent = TouchableOpacity;
    if(Platform.OS==='android'&&Platform.Version>=21){
        ButtonComponent = TouchableNativeFeedback;
    }

    return(
        <View style={styles.buttonContainer}>
        <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>  
            <View style={styles.button}>
                <Text style={{...styles.buttonText,...props.style}}>{props.children}</Text>
            </View>
        </ButtonComponent>
        </View>
    );

}

const styles=StyleSheet.create({
    
    button:{
        
        backgroundColor: colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        margin: 20
    }, 

    buttonText:{
        color: '#fff',
        fontFamily: 'open-sans',
        fontSize: 18
    },

    buttonContainer:{

        borderRadius: 25,
        overflow: 'hidden',
    }
});

export default MainButton;