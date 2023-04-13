import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { read_products, remove_product, buy_product } from "../store/Products/actions";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const route = useRoute();
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const products = useSelector(store => store.products.products);

    useFocusEffect(
        React.useCallback(() => {
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
        }, [route.params])
    );

    const handleRemoveProduct = (id) => {
        dispatch(remove_product({ productId: id, token }));
    };

    const handleBuyProduct = async (id) => {
        try {
            const value = await AsyncStorage.getItem('token');
            dispatch(buy_product({ token: value, productId: id }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setCart(products.filter(product => product.inCart));
    }, [products]);
    return (
        <View>
            <Text style={styles.title}>Carrito de compras</Text>
            <ScrollView>
                {cart.map(product => (
                    <TouchableOpacity key={product._id}>
                        <View style={styles.producto}>
                            <Image source={{ uri: product.imagen }} style={styles.imagen} />
                            <View style={styles.detalles}>
                                <Text style={styles.nombre}>{product.nombre}</Text>
                                <Text style={styles.precio}>${product.precio}</Text>
                                <Button title="Remove" onPress={() => handleRemoveProduct(product._id)} />
                                <Button title="Comprar" onPress={() => handleBuyProduct(product._id)} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 16,
        marginLeft: 16
    },
    producto: {
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 8
    },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 8,
        borderRadius: 4
    },
    detalles: {
        flex: 1,
        justifyContent: "center"
    },
    nombre: {
        fontSize: 16,
        fontWeight: "bold"
    },
    precio: {
        fontSize: 14,
        color: "#777"
    }
});

export default Cart;

