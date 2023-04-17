import React from 'react'
import { View,TextInput, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import google from "../../images/Google.png"
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import tabsActions from '../store/ReloadTabs/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign } from '@expo/vector-icons';
import productsClickActions from '../store/ProductsPagination/actions';

const { reloadTabs } = tabsActions
const { productsClicked } = productsClickActions

export default function LogIn() {
    const navigation= useNavigation()
    const [email, setEmail] = useState('');         
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let state = useSelector(store => store.tabsReducer.state)
    let dispatch = useDispatch()

    async function handleSubmit() {
        setLoading(true)

        let data = {
            email: email,
            password: password
        }
        console.log(data);
        
        let url = 'https://subime-print-fgbog.ondigitalocean.app/api/users/signin'
        let admin
        try {
            await axios.post(url, data).then(res =>{
              res.data.user.is_admin ? (admin = true) : (admin = false)
              AsyncStorage.setItem("token", res.data.token)
              AsyncStorage.setItem("user",JSON.stringify({
                id: res.data.user._id,
                name: res.data.user.name,
                email: res.data.user.email,
                phone: res.data.user.phone,
                photo: res.data.user.photo,
                admin
              }))
              dispatch(reloadTabs({ state: !state }))
              dispatch(productsClicked({ state: false }))
              setLoading(false)
              setTimeout(() => navigation.navigate("Home"), 1000)
            })
            console.log('Login Succesful')
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
  return (


    <View style={styles.containerLogIn}>
        <View style={styles.fieldset}>
          <Text style={styles.legend}>Email</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} id="email" name="email" required onChangeText={(inputText => setEmail(inputText))}/> 
            <AntDesign name="mail" size={24} color="black" />
          </View>
          
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Password</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} secureTextEntry={true} id="password" name="password" required onChangeText={(inputText => setPassword(inputText))} />
            <AntDesign name="lock" size={28} color="black" />
          </View>
        </View>
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.divGoogle}>
          <TouchableOpacity style={styles.button2} onPress={() => {}}>
            <Image style={styles.googleImg} source={google} />
            <Text style={styles.googletext}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.parrafosForm}>
          <Text>
          You don't have an account yet?
            <Text style={styles.parrafosFormText} onPress={() => {
              navigation.navigate("Register");
              }}> Sign up</Text> 
          </Text>
        </View>
        <Spinner visible={loading}/>
      </View>
  )
}

const styles = StyleSheet.create({
        containerLogIn: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          width: "100%",
          height: "100%",
          marginTop: 50
        },
        fieldset: {
          display: "flex",
          alignItems: "flex-start",
          width: 410,
          height: 65,
          width: "90%",
          justifyContent: "flex-start",
          background: "#00b2a5",
          borderBottomWidth: 1,
        },
        legendCont:{
          display: "flex",
          width:"100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        googleImg: {
          width: 20,
          height:20
        },
        googletext:{
          color: "gray"
        },
        legend: {
          marginLeft: 10,
          fontSize: 13,
          lineHeight: 15,
          letterSpacing: 1,
          fontWeight: 500,
          color: "#00b2a5",
        },
        input: {
          width: "90%",
          backgroundColor: "transparent",
          height: 45,
          fontSize: 15,
          padding: 5,
          borderRadius: 5,
        },
        viewBtn: {
          width: "100%",
          height: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        },
        button: {
          backgroundColor: "#00b2a5",
          borderRadius: 10,
          height: 50,
          width: 110,
          justifyContent: "center",
          alignItems: "center",
        },
        
        buttonText: {
          color: "white",
          fontSize: 20
        },
      
        button2: {
          backgroundColor: "white",
          borderRadius: 10,
          height: 50,
          width: 110,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          flexDirection: "row",
          gap: 5
        },    
        divGoogle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          width: 100,
          borderRadius: 10,
          background: "#EBEBEB",
          border: 1,
        },
      
        parrafosForm: {
          display: "flex",
          gap: 17,
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        },
      
        parrafosFormText:{
          color: "#00b2a5",
          fontWeight: 700,
        },
})
