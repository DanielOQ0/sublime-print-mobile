import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cart({ route }) {
    const { cart } = route.params;
    const products = useSelector(store => store.products.products);
    useEffect(() => {
        dispatch(read_products({ products }));
    }, [reload]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart</Text>
            {cart.map((product) => (
                <View key={product._id} style={styles.product}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 16,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
