import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Home from "../components/Home";
import Form from "./Form"

export default function Index() {
    let state = "Register"
    let [token, setToken] = useState("")

    useFocusEffect(React.useCallback(() =>{
        async function getData(){
            try{
                const value = await AsyncStorage.getItem("token")
                setToken(value)
            }catch(error){
                console.log(error)
            }
        }
        getData()
    }, [state]))

    return (
        <ScrollView>
            <Home/>
            {token ? "" : <Form state={state} />}
        </ScrollView>
    );
}
