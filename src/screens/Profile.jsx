import React from 'react'
import { ScrollView, View } from 'react-native'
import Perfil from '../components/Perfil'
import Logout from '../components/Logout'
import { StyleSheet } from 'react-native'

export default function Profile() {
  return (
    <View style={styles.viewProfile}>
        <View style={styles.perfil}>
            <Perfil/>
        </View>
        <View>
            <Logout/>
        </View>
    </View>
   
  )
}
const styles = StyleSheet.create({
    viewProfile: {
        backgroundColor: "white",
        height: "100%"
    }
})
