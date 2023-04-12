import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "../screens/Index";
import Form from "../screens/Form";
import ProductScreen  from "../screens/ProductScreen";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../screens/Store"
import { MaterialIcons } from "@expo/vector-icons";
import Logout from "../screens/Logout";
import CardsProducts from "../components/CardsProducts";

const Tab = createBottomTabNavigator()

function BottomTabsNavigation() {
  let [token, setToken] = useState("")
  let state = useSelector((store) => store.tabsReducer.state)

  useFocusEffect(React.useCallback(() => {
    async function getData() {
      try {
        // await AsyncStorage.clear();
        const value = await AsyncStorage.getItem("token")
        // await AsyncStorage.removeItem('token');
        setToken(value)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [state]))

  return (
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "transparent",
          height: 55,
          paddingBottom: 5,
          paddingTop: 5,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#00b2a5",
        tabBarInactiveTintColor: "#9B9B9B",
        tabBarTabStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Index}
        initialParams={{ state: "Register" }}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      {token ? (
        <>
          <Tab.Screen
            name="store"
            component={store}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="storefront" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen

            name="shopping-cart"
            component={ProductScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="shopping-cart" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name='LogOut'
            component={Logout}
            options={{
              headerShown: false,
              tabBarLabel: "LogOut",
              tabBarIcon: ({ color }) => (
                <AntDesign name="logout" size={24} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Register"
            component={Form}
            initialParams={{ state: 'Register' }}
            options={{
              headerShown: false,
              tabBarLabel: 'Register',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="user-circle" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="LogIn"
            component={Form}
            initialParams={{ state: 'Login' }}
            options={{
              headerShown: false,
              tabBarLabel: "LogIn",
              tabBarIcon: ({ color }) => (
                <AntDesign name="login" size={24} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default BottomTabsNavigation