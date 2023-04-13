import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import StoreSearch from '../components/StoreSearch'
import SearchCategories from '../components/SearchCategories'
import CardsProducts from "../components/CardsProducts"
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Store() {
  const navigation = useNavigation();

  
  return (
    <ScrollView style={{backgroundColor: "#E4F1F5"}}>
      <View style={styles.viewUp}>
        <StoreSearch/>
        <SearchCategories/>
      </View>
      <View>
        <CardsProducts/>
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
