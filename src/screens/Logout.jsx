import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import tabsActions from '../store/ReloadTabs/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

const { reloadTabs } = tabsActions

function Logout() {
  const navigation = useNavigation()
  const [ loading, setLoading ] = useState(false)
  
  let state = useSelector(store => store)
  let dispatch = useDispatch()

  useEffect(() => {
    async function handleLogout() {
      setLoading(true)
      try {
        const token = await AsyncStorage.getItem('token');
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let url = 'https://subime-print-fgbog.ondigitalocean.app/api/users/signout'
        await axios.post(url, "", headers)
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('user')
        console.log('Logout')
        dispatch(reloadTabs({ state: !state }))
        setLoading(false)
        setTimeout(() => navigation.navigate('Home'), 1000)
      } catch (error) {
        console.log(error);
      }
    }
    handleLogout();
  }, []);

  return (
    <ScrollView>
      <View style={styles.logout}>
        <Text style={styles.textLogout}>Thank you for the visit, we are waiting for you back!</Text>
      </View>
      <Spinner visible={loading}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logout: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogout: {
    color: "orange",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 5,
    width: "80%",
    height: 60,
    marginTop: 550,
    textAlign: "center"
  }
})

export default Logout