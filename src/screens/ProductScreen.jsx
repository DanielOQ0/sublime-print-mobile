import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import actions from "../store/Products/actions.js";
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
const { read_products } = actions;

function ProductScreen() {
    const route = useRoute();
    const [cart, setCart] = useState(route.params?.cart || []);
    const [totalPrice, setTotalPrice] = useState(() => cart.reduce((total, product) => total + product.price, 0));
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const products = useSelector(store => store.products.products);
    const [token, setToken] = useState();

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
    }, [cart, route.params]));

    const removeFromCart = (product) => {
        const newCart = cart.filter((item) => item._id !== product._id);
        setCart(newCart);
        setTotalPrice(totalPrice - product.price);
    };

    const handleBuy = () => {
        alert('¡Gracias por tu compra!');
        route.params.setCart([]);
    };

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

export default ProductScreen;



