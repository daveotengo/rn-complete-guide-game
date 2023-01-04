import React from 'react';
import {View,Button,Text,
    TouchableNativeFeedback,
    Platform,
     TouchableOpacity,StyleSheet} from 'react-native';
import colors from '../constants/colors'

const MainButton = props => {

  

    return(
        
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>  
            <View style={styles.button}>
                <Text style={{...styles.buttonText,...props.style}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
      
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

   
});

export default MainButton;