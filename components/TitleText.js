import React from 'react';
import {Text,View,StyleSheet} from  'react-native'

const TitleText = props => {

    return(
        <Text style={{...styles.title, ...props.style}} >
            {props.children}
        </Text>
    );

};

const styles = StyleSheet.create({
    title: {
       fontFamily: 'open-sans' ,
       fontSize: 18
    }
});

export default TitleText;