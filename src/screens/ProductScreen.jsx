import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { addProductToCart } from '../store/Cart/cartActions.js';

function ProductScreen() {
    const [quantity, setQuantity] = useState(1);
    const products = useSelector(store => store.products.products);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addProductToCart(products, quantity));
        dispatch(read_products({ products })); // opcionalmente podrías enviar un objeto con opciones de recarga {reload: true}
        navigation.navigate('Cart'); // nombre de la pantalla a la que deseas navegar
      };
      

    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24 }}>{products.name}</Text>
                <Text style={{ fontSize: 18, marginVertical: 10 }}>
                    {products.description}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    ${products.price}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ padding: 5, backgroundColor: '#eee', borderRadius: 5 }}
                        onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    >
                        <Text style={{ fontSize: 18 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{quantity}</Text>
                    <TouchableOpacity
                        style={{ padding: 5, backgroundColor: '#eee', borderRadius: 5 }}
                        onPress={() => setQuantity(quantity + 1)}
                    >
                        <Text style={{ fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 20,
                    }}
                    onPress={handleAddToCart}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default ProductScreen;
