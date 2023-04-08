import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import welcome from "../../images/Welcome.png"

export default function Welcome() {
  return (
    <ScrollView>
        <View style={styles.principal}>
            <View style={styles.welcome}>
                <Image source={welcome}/>
            </View>
            <View>
                <Text style={styles.textDesc}>Register and discover our products</Text>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    principal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingTop: 50,
        gap: 20
    },
    welcome: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 35,
    },
    textDesc: {
        marginBottom: 40,
        fontSize: 20
    }
})
