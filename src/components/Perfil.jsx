import React, { useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function Perfil() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
          const userData = await AsyncStorage.getItem('user');
          setUser(JSON.parse(userData));
        };
        getUser();
      }, []);

      return (
        <View style={styles.viewPrincipal}>
            {user ? (
                 <View style={styles.userContainer}>
                    <Image style={styles.userPhoto} source={{ uri: user.photo }} />
                    <Text style={styles.userText}>{user.name}</Text>
                    <Text style={styles.userText}>{user.email}</Text>
               </View>
            ) : (   
                <View style={styles.loggedOutContainer}>
                    <Text style={styles.loggedOutText}>You are not logged in</Text>
                        <TouchableOpacity style={styles.button} onPress={() => alert('login')}>
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                </View>
            )}
        </View>
      )
    }
    const styles = StyleSheet.create ({
        viewPrincipal: {
            height: "80%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
        },
        userPhoto:{
            height: 200,
            width: "90%"
        },
        userContainer: {
            borderWidth: 2,
            borderColor: "#00b2a5",
            borderRadius: 16,
            width: "60%",
            height: 300,
            display: "flex",
            alignItems: "center",
            gap: 20
        },
        userText: {
            fontSize: 15,
            color: "black"
        }
    })