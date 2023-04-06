import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Image } from 'react-native'
import logo from "../../images/SublimePrints.png"
import design from "../../images/design.png"

export default function Index() {
  return (
    <View style={styles.viewIndex}>
        <Image style={styles.logo} source={logo}/>
        <Image source={design}/>
    </View>
  )
}

const styles = StyleSheet.create({
    viewIndex: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        alignItems: "center",
        gap: 20,
        paddingTop: 100
    },
    logo: {
        width: 200,
        height: 200,
        
    }
})
