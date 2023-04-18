import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import actions from "../store/Products/actions.js";
import axios from 'axios'
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";

const { read_products } = actions;

function Cart({ route }) {
    const { cart } = route.params;
    const [carrito, setCarrito] = useState(cart || []);
    const [totalPrice, setTotalPrice] = useState(
        () => cart.reduce((total, product) => total + product.price, 0)
    );
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const [token, setToken] = useState();
    const [cartUpdated, setCartUpdated] = useState();
    const reload = useSelector((store) => store.Status.Status);
    const summary = useSelector((store) => store.price);

    useEffect(() => {
        const newTotalPrice = cart.reduce((total, product) => total + product.price, 0);
        setTotalPrice(newTotalPrice);
    }, [reload]);

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                try {
                    const value = await AsyncStorage.getItem('token');
                    dispatch(read_products({ token: value }));
                    setToken(value);
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }, [cart, cartUpdated])
    );

    async function getData() {
        try {
            const value = await AsyncStorage.getItem('token');
            dispatch(read_products({ token: value }));
            setToken(value);
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getData();
            setCartUpdated(cartUpdated);
        }, [reload])
    );

    useEffect(() => {
        getData();
    }, [cart, cartUpdated]);

    const removeFromCart = (product) => {
        const newCart = cart.filter((item) => item._id !== product._id);
        setCarrito(newCart);
        setTotalPrice((prevPrice) => prevPrice - product.price);
        setCartUpdated(!cartUpdated);
    };

    useEffect(() => {
        setTotalPrice(cart.reduce((total, product) => total + product.price, 0));
    }, [cart, reload]);
    
    const handleBuy = () => {
        alert('¡Gracias por tu compra!');
        setCarrito([]);
    };

    // async function handleBuy(){
    //     const productsIds = products.map((e) => e._id);
    //     const productsNames = products.map((e) => e.name);
    //     const headers = { headers: { Authorization: `Bearer ${token}` } };
    //     const url = "https://subime-print-fgbog.ondigitalocean.app/api/payments"
    //     const payments = {
    //         id: productsIds.join(),
    //         name: productsNames.join(),
    //         currency_id: 'ARS',
    //         price: totalPrice.price,
    //         quantity: 10,
    //     };

    //     if(token){
    //         try{
    //             const response = await axios.post(url,payments,headers)
    //             const puedeAbrir = await Linking.canOpenURL(response.data.response.body.init_point);
    //             if (puedeAbrir) {
    //               await Linking.openURL(response.data.response.body.init_point);
    //             }
    //         }catch(error){
    //             console.log(error)
    //         }
    //     }
    // };


    return (
        <ScrollView>
            <View style={styles.container}>
                {cart.map((product) => (
                    <View style={styles.card} key={product._id}>
                        <Image style={styles.cardImage} source={{ uri: product.image }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{product.name}</Text>
                            <Text style={styles.cardPrice}>${product.price}</Text>
                            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(product)}>
                                <Text style={styles.removeButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <View style={styles.checkoutContainer}>
                    <Text>Total: ${totalPrice}</Text>
                    <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                        <Text style={styles.buyButtonText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 200,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        marginBottom: 16,
        overflow: 'hidden',
    },
    cardImage: {
        width: 120,
        height: 120,
    },
    cardContent: {
        flex: 1,
        padding: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardPrice: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'flex-start',
    },
    removeButtonText: {
        color: '#ffffff',
        fontSize: 12,
    },
    checkoutContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buyButtonText: {color: "green",
    fontSize: 16,
    fontWeight: "bold",
marginLeft: 20}
});

export default Cart;

