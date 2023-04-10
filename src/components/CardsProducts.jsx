import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import image1 from "../../images/imagecart1.jpg"
import image2 from "../../images/imagecart2.jpg"
import image3 from "../../images/imagecart3.jpg"
import image4 from "../../images/imagecart4.jpg"
import image5 from "../../images/imagecart5.jpg"
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

export default function CardsProducts() {
    let text = useSelector(store => store.text.text)
    let [text1,setText1] = useState(useSelector(store => store.text.text))
    useEffect( () => {
        setText1(text)
    }, [text]);

  return (
    <ScrollView>
        <View style={styles.cardProduct}>
            <Image source={image1} style={styles.image}/>
            <Text style={styles.title}>"T-Shirt"</Text>
            <Text style={styles.price}> $100</Text>
        </View>
        <View style={styles.cardProduct}>
            <Image source={image2} style={styles.image}/>
            <Text style={styles.title}>"T-Shirt Pack"</Text>
            <Text style={styles.price}> $250</Text>
        </View>
        <View style={styles.cardProduct}>
            <Image source={image3} style={styles.image}/>
            <Text style={styles.title}>"Mug"</Text>
            <Text style={styles.price}> $115</Text>
        </View>
        <View style={styles.cardProduct}>
            <Image source={image4} style={styles.image}/>
            <Text style={styles.title}>"Mug Set"</Text>
            <Text style={styles.price}> $235</Text>
        </View>
        <View style={styles.cardProduct}>
            <Image source={image5} style={styles.image}/>
            <Text style={styles.title}>"Cap"</Text>
            <Text style={styles.price}> $125</Text>
        </View>
        <View style={styles.ViewBtns}>
        <TouchableOpacity style={styles.btns}>
            <Text style={styles.textBtns}>Next</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    cardProduct: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 10,
        marginLeft: 20,
        width: "90%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    title: {
        fontSize: 20
    },
    price: {
        color: "red",
        fontSize: 15
    },
    ViewBtns: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 20
    },
    btns: {
        backgroundColor: "#00b2a5",
        borderRadius: 16,
        width: 70,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textBtns: {
        color: "white"
    }
})
