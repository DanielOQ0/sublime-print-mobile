import React from 'react'
import { Text, View, TouchableOpacity, Button} from 'react-native'
import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import categoriesActions from '../store/Categories/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

let categoriesCheck = []

function SearchCategories() {
    const [categories, setCategories] = useState(false)
    const { captureCheck } = categoriesActions
    const [filters, setFilters] = useState([]);
    let token = AsyncStorage.getItem("token")
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    const dispatch = useDispatch()

    let checkedCategories = useSelector(store => store.categories.categories)

    console.log(checkedCategories)
    let categoriesUrl = "https://subime-print-fgbog.ondigitalocean.app/api/categories/"

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const token = await AsyncStorage.getItem('token');
                let headers = { headers: { Authorization: `Bearer ${token}` } }; 
                axios.get(categoriesUrl, headers).then(e => setCategories(e.data.Categories))
                
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []));

    function handleCheck(e, categoryName) {
        categories.forEach(category => {
            if (category.name === categoryName) {
                if (!categoriesCheck.includes(category._id)) {
                    categoriesCheck.push(category._id)
                } else {
                    categoriesCheck = categoriesCheck.filter(e => e !== category._id)
                }
                dispatch(captureCheck({ categories: categoriesCheck.join() }))
            }
        })
    }
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://subime-print-fgbog.ondigitalocean.app/api/categories', headers);
            const categories = response.data.Categories;
            const cat = {
              id: 'category',
              name: 'Category',
              options: categories.map((category) => ({
                value: category._id,
                label: category.name,
                checked: false,
              })),
            };
            setFilters([cat]);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchCategories();
      }, []);

    return (
        <View style={styles.categoriesType}>
            {
                categories ? categories.map((category, i) => {
                    let checkclass = checkedCategories.includes(category._id) ? "checked" : ""
                    return <TouchableOpacity style={[styles.category, checkclass && styles.checked]} key={i} onPress={(event) => handleCheck(event, category.name)} categoryName={category.name} >
                        <Text style={styles.text}>{category.name}</Text>
                    </TouchableOpacity>
                }) : ""
            }
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesType: {
        width: "90%",
        height: 100,
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        gap: 8,
        marginBottom: 20,
        marginTop: 30
    },
    category: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "black"
    },
    text: {
        color: 'black',
    },
    checked: {
        borderColor: '#00b2a5',
        borderWidth: 1,
        opacity: 0.5,
        transform: [
            { scale: 1.1 }
        ]
    }
})

export default SearchCategories