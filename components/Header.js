import React from 'react';
import {View,Text, StyleSheet,Platform} from 'react-native';
import Color from '../constants/colors'

const Header = (props)=>{
    return(
        <View style={{
            ...styles.header,
        ...Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid,
        })
        }}>
            <Text style={styles.headerTitle}> {props.title} </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
       
    },

    headerTitle:{
        color: Platform.Os === 'ios' ? Color.primary : 'white',
        fontSize: 18
    },

    headerIOS:{
        backgroundColor: Color.primary, //white,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },

    headerAndroid:{
        backgroundColor: Color.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },

})
export default Header ;