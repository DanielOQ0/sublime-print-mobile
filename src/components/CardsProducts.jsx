import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productsActions from "../store/Products/actions.js";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import productsClickActions from "../store/ProductsPagination/actions.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

const { read_products } = productsActions;
const { productsPagination } = productsClickActions

function CardProducts() {
    let text = useSelector(store => store.text.text)
    let categories = useSelector(store => store.categories.categories)
    let products = useSelector((store) => store.products.products);
    let [text1,setText1] = useState(useSelector(store => store.text.text))
    let [page,setPage] = useState(1)
    let [token,setToken] = useState('')
    const [cart, setCart] = useState([]);
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                let headers = { headers: { 'Authorization': `Bearer ${token}` } }
                dispatch(read_products({ token: value, page: page, inputText: text, categories: categories, headers }));
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [cart, route.params]));
    

        function handleViewCart(e, id) {
        dispatch(productsPagination({state: true}))
        setTimeout( () => {
            navigation.navigate('Shopping-cart',{productId: id});
        }, 100)
    }

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

        // navigation.navigate('shopping-cart', { cart: [...cart, productToBuy] });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    products ? ( products.length ? (products.map((product, i) => {
                        return (
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
                        )
                    })
                    ): (
                    <Text>No products found </Text>
                    )
                    ) : (
                        <View/>
                    )}
                    <View style={styles.pageBtns}>
                {
                    page === 1 ? <></> :
                        <TouchableOpacity style={styles.btns} onPress={() => {setPage(page-1)}}>
                            <Text style={styles.btnsText}>Prev</Text>
                        </TouchableOpacity>
                }
                {
                    products.length == 6 || products.length == 10 ?
                        <TouchableOpacity style={styles.btns} onPress={() => {setPage(page+1)}}>
                            <Text style={styles.btnsText}>Next</Text>
                        </TouchableOpacity> : <></>
                }

            </View>

            </View>
                <View>
                    <TouchableOpacity
                    style={styles.viewCartButton}
                    onPress={(event) => handleViewCart(event, handleBuyProduct)}>
                    <Text style={styles.viewCartButtonText}>Ver carrito ({cart.length})</Text>
                    </TouchableOpacity>
                </View>
           
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
    pageBtns:{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        gap: 10,
        width: 70,
        height: 30

    },
    btns: {
        backgroundColor: "#2e8b57",
        borderRadius: 16,
        width: 60,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    btnsText:{
        color: "white",
        fontSize: 16
    }
});

export default CardProducts;
