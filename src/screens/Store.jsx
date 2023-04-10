import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import StoreSearch from '../components/StoreSearch'
import SearchCategories from '../components/SearchCategories'
import CardProducts from "../components/CardsProducts"

export default function Store() {
  return (
    <ScrollView style={{backgroundColor: "#E4F1F5"}}>
      <View style={styles.viewUp}>
        <StoreSearch/>
        <SearchCategories/>
      </View>
      <View>
        <CardProducts/>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  viewUp: {
    marginTop: 30,
    alignItems: "center"
  }
})
