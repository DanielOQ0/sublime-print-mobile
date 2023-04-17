import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import tabsActions from '../store/ReloadTabs/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { reloadTabs } = tabsActions

function Logout() {
  const navigation = useNavigation()
  const [ loading, setLoading ] = useState(false)
  let state = useSelector(store => store.tabsReducer.state)
  let dispatch = useDispatch()
  let [ token, setToken ] = useState()

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        try {
          const value = await AsyncStorage.getItem("token");
          setToken(value);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [state])
  );

  let headers = { headers: { 'Authorization': `Bearer ${token}` } }

  const handleLogout = async () => {
    let url = 'https://subime-print-fgbog.ondigitalocean.app/api/users/signout'
    try {
      setLoading(true)
      await axios.post(url, " ", headers)
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("user")

      const storedToken = await AsyncStorage.getItem("token")
      const storedUser = await AsyncStorage.getItem("user")
      console.log("Token almacenado:" , storedToken)
      console.log("User almacenado:" , storedUser)
      dispatch(reloadTabs({state: false}))
      dispatch(reloadTabs({state: !state}))

      setTimeout(() => {
        setLoading(false)
      }, 3000)
      navigation.navigate("Home")
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <View>
      <View style={styles.viewLogout}>
        <TouchableOpacity style={styles.btnlogout} >
          <Text style={styles.textlogout}>Edit</Text>
          <Text><FontAwesome5 name="user-edit" size={20} color="white" /></Text>
          <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewLogout}>
        <TouchableOpacity style={styles.btnlogout} onPress={handleLogout}>
          <Text style={styles.textlogout}>Log Out</Text>
          <Text> <AntDesign name="logout" size={20} color="white" /></Text>
          <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
        </TouchableOpacity>
      </View>
    </View>
   
  )
}

const styles = StyleSheet.create({
  viewLogout: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
  },
  btnlogout: {
    backgroundColor: "#00b2a5",
    width: 150,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    marginBottom: 10
  },
  textlogout: {
    color: "white",
    fontSize: 15,
    marginLeft: 10
  }
})
export default Logout