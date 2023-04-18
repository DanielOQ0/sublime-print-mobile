import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import actions from "../store/Products/actions.js";
import axios from 'axios'
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import priceActions from "../store/ChangePrice/actions"

const { changePrice } = priceActions
const { read_products } = actions;

function Cart({ route }) {
    const { cart } = route.params;
    const [carrito, setCarrito] = useState(cart || []);
    const [totalPrice, setTotalPrice] = useState(() => cart.reduce((total, product) => total + product.price, 0));

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const products = useSelector(store => store.products.products);
    const [token, setToken] = useState();
    const [cartUpdated, setCartUpdated] = useState();
    const reload = useSelector(store => store.Status.Status)
    let summary= useSelector(store=>store.price)
    
    useEffect(() => {
        const newTotalPrice = cart.reduce((total, product) => total + product.price, 0);
        setTotalPrice(newTotalPrice);
    }, [reload]);


    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                dispatch(read_products({ products: products._id, token: value }));
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [cart, cartUpdated])); // Agrega "cartUpdated" a la lista de dependencias para que se actualice automáticamente

    async function getData() {
        try {
            const value = await AsyncStorage.getItem('token');
            dispatch(read_products({ products: products._id, token: value }));
            setToken(value)

        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getData()
            setCartUpdated(cartUpdated)
        }, [reload])
    )

    useEffect(() => {
        getData();
    }, [cart, cartUpdated]);

    const removeFromCart = (product) => {
        const newCart = cart.filter((item) => item._id !== product._id);
        setCarrito(newCart);
        setTotalPrice(totalPrice - product.price);
        setCartUpdated(!cartUpdated)
        console.log(newCart)
    };


    useEffect(() => {
        // Se ejecutará cuando cambie el carrito
        setTotalPrice(cart.reduce((total, product) => total + product.price, 0));
    }, [cart, reload]);

    // const handleBuy = () => {
    //     alert('¡Gracias por tu compra!');
    //     setCarrito([]);
    // };

    const productsIds = products.map((e) => e._id);
    const productsNames = products.map((e) => e.name);
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const payments = {
        id: productsIds.join(),
        name: productsNames.join(),
        currency_id: "ARS",
        price: summary.total,
    };
    function handleBuy() {
        axios.post('https://subime-print-fgbog.ondigitalocean.app/api/payments', payments, headers)
            .then((res) => {
                const initPoint = res.data.response.body.init_point;
                Linking.openURL(initPoint);
            })
            .catch((error) => {
                console.log(error);
            });
    }



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
    }
});

export default Cart;