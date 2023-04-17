import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'
import google from "../../images/Google.png"
import Welcome from './Welcome'
import { AntDesign } from '@expo/vector-icons'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('');
  const navigation = useNavigation()
  const [loading, setLoading] = useState()

  async function handleSubmit() {
    setLoading(true)

    let data = {
      name: name,
      email: email,
      phone: phone,
      photo: photo,
      password: password
    }
    console.log(data);
    let url = 'https://subime-print-fgbog.ondigitalocean.app/api/users/signup/'
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  
      console.log('creado')
      setTimeout(() => {
        setLoading(false)
      }, 3000)
      navigation.navigate('LogIn')
      Alert.alert(
        'Welcome to Sublime Prints!',
        'Account created successfully'
      )
      }catch (error) {
        if (error.response) {
          // Si se recibió una respuesta del servidor pero con un código de estado fuera del rango 2xx
          console.log('Error en la respuesta:', error.response.data);
          console.log('Código de estado:', error.response.status);
          console.log('Headers de respuesta:', error.response.headers);
        } else if (error.request) {
          // Si no se recibió ninguna respuesta del servidor
          console.log('Error de solicitud:', error.request);
        } else {
          // Si ocurrió algún otro tipo de error
          console.log('Error:', error.message);
        }
        setLoading(false)
      }
      
  }


  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.welcome}>
        <Welcome />
      </View>
      <View style={styles.ViewRegister}>
        <View style={styles.fieldset}>
          <Text style={styles.legend}>Name</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} id="name" name="name" required onChangeText={(inputText => setName(inputText))} />
            <AntDesign name="user" size={25} color="black" />
          </View>
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Email</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} id="email" name="email" required onChangeText={(inputText => setEmail(inputText))} />
            <AntDesign name="mail" size={25} color="black" />
          </View>
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Photo</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} id="photo" name="photo"  onChangeText={(inputText => setPhoto(inputText))} />
            <AntDesign name="camerao" size={25} color="black" />
          </View>
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Phone</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} id="phone" name="phone" onChangeText={(inputText => setPhone(inputText))} />
            <AntDesign name="phone" size={25} color="black" />
          </View>
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Password</Text>
          <View style={styles.legendCont}>
            <TextInput style={styles.input} secureTextEntry={true} id="password" name="password" required onChangeText={(inputText => setPassword(inputText))} />
            <AntDesign name="lock" size={28} color="black" />
          </View>
        </View>

        <TouchableOpacity style={styles.buttonSignUp} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.divGoogle}>
          <TouchableOpacity style={styles.button2}>
            <Image style={styles.googleImg} source={google} />
            <Text style={styles.buttonText2}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.parrafosForm}>
          <Text>
            Already have an account?
            <Text style={styles.parrafosFormText} onPress={() => {
              navigation.navigate("LogIn");
            }}> Log in</Text>
          </Text>
        </View>
        <Spinner visible={loading} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ViewRegister: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20
  },
  fieldset: {
    display: "flex",
    alignItems: "flex-start",
    width: 410,
    height: 65,
    width: "90%",
    justifyContent: "flex-start",
    borderRadius: 10,
    background: "#00b2a5",
    borderWidth: 1,
  },
  legendCont: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 18,
    height: 18,
    marginBottom: 10,
  },
  googleImg: {
    width: 30,
    height: 30
  },
  buttonText2: {
    color: "gray"
  },
  legend: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 4,
    fontWeight: 500,
    color: "#00b2a5",
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    height: 45,
    fontSize: 15,
    padding: 11,
    borderRadius: 5,
  },
  buttonSignUp: {
    backgroundColor: "#00b2a5",
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    width: "90%",
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
    height: 60,
    margin: 15,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 20
  },

  buttonText3: {
    color: "grey"
  },

  divGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 410,
    height: 16,
    borderRadius: 10,
    background: "#EBEBEB",
    border: 1,
  },

  parrafosForm: {
    display: "flex",
    gap: 17,
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  parrafosFormText: {
    color: "#00b2a5",
    fontWeight: 700,
  },
  welcome: {
    marginBottom: 20
  }
});
