import React from 'react'
import {StyleSheet, Text, View, TextInput, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import textActions from '../store/Search/actions';
import lupa from "../../images/Search.png"
import { ScrollView } from 'react-native';

const { captureText } = textActions

export default function StoreSearch() {

  const dispatch = useDispatch()
  function handleSearch(text) {
    dispatch(captureText({ inputText: text}))
  }

  return (
    <ScrollView>
        <Text style={styles.titleText}>Discovery</Text>
        <View style={styles.search}>
            <Image source={lupa} style={styles.lupa}/>
            <TextInput style={styles.inputSearch} placeholder='Find the products you want' onChangeText={handleSearch}/>            
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    titleText: {
        color: "black",
        fontSize: 50,
    },
    search: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: 380,
      height: 50,
      borderRadius: 15,
      backgroundColor: "white",
      gap: 5,
      paddingLeft: 10,
      marginTop: 50
    },
    inputSearch: {
      alignItems: "center",
      width: 360,
      height: 50,
    },
})