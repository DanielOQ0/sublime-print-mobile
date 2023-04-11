import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/Products/actions.js";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const { read_products } = actions;

function CardsProducts() {
    const [reload, setReload] = useState(false);
    const [cart, setCart] = useState([]);
    const products = useSelector(store => store.products.products);
    console.log(products)
    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(read_products({ products }));
    }, [reload]);
    const handleBuyProduct = (_id) => {
        // Buscar el producto por ID
        const productToBuy = products.find(product => product._id === _id);

        // Validar que el producto exista
        if (!productToBuy) {
            console.log(`No se encontró el producto con ID ${_id}`);
            return;
        }

        // Agregar el producto al carrito
        setCart([...cart, productToBuy]);

        console.log(`Añadido al carrito: ${productToBuy.name}`);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {products.map((product) => (
                    <View style={styles.card} key={product._id}>
                        <Image style={styles.cardImage} source={{ uri: product.image }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{product.name}</Text>
                            <Text style={styles.cardPrice}>${product.price}</Text>
                            <Text style={styles.cardDescription}>{product.description}</Text>
                            <TouchableOpacity
                                style={styles.buyButton}
                                onPress={() => handleBuyProduct(product._id)}
                            >
                                <Text style={styles.buyButtonText}>Buy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <TouchableOpacity
                style={styles.viewCartButton}
                onPress={() => navigation.navigate('Cart', { cart })}
            >
                <Text style={styles.viewCartButtonText}>Ver carrito ({cart.length})</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingVertical: 16,
    },
    card: {
        width: "45%",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 16,
        overflow: "hidden",
    },
    cardImage: {
        height: 150,
        marginTop: 5,
        width: "100%",
    },
    cardContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00b2a5",
        marginTop: 8,
    },
    cardDescription: {
        fontSize: 14,
        marginTop: 8,
    },
    buyButton: {
        backgroundColor: "#00b2a5",
        borderRadius: 8,
        marginBottom: 10,
        padding: 5,
        alignItems: "center",
    },
    buyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CardsProducts;
