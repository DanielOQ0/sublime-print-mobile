import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import StoreSearch from '../components/StoreSearch'
import SearchCategories from '../components/SearchCategories'

export default function Store() {
  return (
    <ScrollView>
      <View>
        <StoreSearch/>
        <SearchCategories/>
      </View>
      <View>
        
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
})
