import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = (props) =>{
    return (
        <View style={styles.container} >
            <Text {...props} style={styles.number} >
            {props.children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderColor: Colors.accent,
        borderWidth: 2,
        marginVertical: 10 ,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    number:{
        color: Colors.accent,
        fontSize: 22
    }
});

export default NumberContainer;