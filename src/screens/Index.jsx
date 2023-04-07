import React from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { View, Image } from 'react-native'
import logo from "../../images/SublimePrints.png"
import design from "../../images/design.png"
import LogIn from './LogIn'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Index() {
  return (
    <ScrollView>
      <View style={styles.viewIndex}>
          <Image style={styles.logo} source={logo}/>
          <Image source={design}/>
        <View style={styles.login}>
          <LogIn/>
        </View>
      </View>
      
        
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    viewIndex: {
        backgroundColor: "white",
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    logo: {
        width: 200,
        height: 200,
        
    },
    login: {
      paddingTop: 30
    }
})
