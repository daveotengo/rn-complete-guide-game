import React from 'react';
import {TextInput,View,StyleSheet} from 'react-native';

const Input = (props) =>{
    return (
        <View>
            <TextInput {...props} style={{...styles.input,...props.style}} >
            {props.children}
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10 ,
    },
});

export default Input;