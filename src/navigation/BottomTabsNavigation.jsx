import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "../screens/Index";
import Register from "../screens/Register"
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

function BottomTabsNavigation() {
    return(
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
          }}>
            <Tab.Screen name="Home" 
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" size={size} color={color} />
                ),
              }} component={Index}/>
              <Tab.Screen name="Register" 
             options={{
                headerShown: false,
                tabBarLabel: 'Register',
                tabBarIcon: ({ color }) => (
                <FontAwesome name="user-circle" size={24} color={color} />
            ),
          }} component={Register}/>
        </Tab.Navigator>
    )
}

export default BottomTabsNavigation