import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productsActions from "../store/Products/actions.js";
import productsClickActions from "../store/ProductsPagination/actions.js";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { read_products } = productsActions;
const { productsPagination } = productsClickActions

function CardsProducts() {
    const route = useRoute();
    const [cart, setCart] = useState([]);
    let [text1,setText1] = useState(useSelector(store => store.text.text))
    let [page,setPage] = useState(1)
    let categories = useSelector(store => store.categories.categories)
    let text = useSelector(store => store.text.text)
    let order = useSelector(store => store.order.order)
    const products = useSelector(store => store.products.products);
    const [token, setToken] = useState();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                dispatch(read_products({ token: value }));
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [cart, route.params]));

    function getProducts(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(read_products({ page: page, inputText: text, categories: categories, order: order, headers }))
    }
    useEffect( () => {
        setText1(text)
        getProducts(token)
    }, [page, text, categories, order, token]);

    const handleBuyProduct = (_id) => {
        // Buscar el producto por ID
        const productToBuy = products.find(product => product._id === _id);

        // Validar que el producto exista
        if (!productToBuy) {
            console.log(`No se encontró el producto con ID ${_id}`);
            return;
        }

        // Agregar el producto al carrito
        setCart(prevCart => [...prevCart, productToBuy]);

        console.log(`Añadido al carrito: ${productToBuy.name}`);

        // navigation.navigate('Bag', { cart: [...cart, productToBuy] });
    }
    useEffect(() =>{
        navigation.setOptions({
            headerLargeTitle: true,
            headerRight: () =>(
                <TouchableOpacity
                    style={styles.viewCartButton}
                    onPress={() => navigation.navigate('Bag', { cart })}>
                    <Text style={styles.viewCartButtonText}><FontAwesome5 name="shopping-bag" size={24} color="black" /></Text>
                </TouchableOpacity>
            )
        })
    }, [navigation])
    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    products ? (products.length ? (products.map((product, i) =>{
                        return (
                            <View style={styles.card} key={i}>
                                <Image style={styles.cardImage} source={{ uri: product.image }} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{product.name}</Text>
                                    <Text style={styles.cardPrice}>${product.price}</Text>
                                    <Text style={styles.cardDescription}>{product.description}</Text>
                                    <TouchableOpacity
                                        style={styles.buyButton}
                                        onPress={() => handleBuyProduct(product._id)}
                                    >
                                        <Text style={styles.buyButtonText}>Add to bag</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                    ) : (
                        <Text> No products found</Text>
                    )
                    ) : (
                        <View/>
                    )}
            </View>
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
        justifyContent: "space-between",
        gap: 20
    },
    cardImage: {
        height: 150,
        width: "100%",
    },
    cardContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 10

    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00b2a5",
    },
    cardDescription: {
        fontSize: 14,
    },
    buyButton: {
        backgroundColor: "#00b2a5",
        borderRadius: 8,
        padding: 5,
        alignItems: "center",
        marginTop: 20
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
        height: 30,
        marginBottom: 20,
        marginTop: 40,
        marginLeft: 180

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
    },
    viewCartButton: {
        marginRight: 10
    }
});

export default CardsProducts;
