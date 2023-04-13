import React from 'react'
import { Text, View, TouchableOpacity, Button} from 'react-native'
import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import categoriesActions from '../store/Categories/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

let categoriesCheck = []

function SearchCategories() {
    const [categories, setCategories] = useState(false)
    const { captureCheck } = categoriesActions
    const [filters, setFilters] = useState([]);
    let token = AsyncStorage.getItem("token")
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    const dispatch = useDispatch()

    let checkedCategories = useSelector((store) => store.categories.categories)
    
    useEffect(() => {
        axios.get("https://subime-print-fgbog.ondigitalocean.app/api/categories", headers).then(e => {
          setCategories(e.data.Categories);
          console.log('categories:', e.data.Categories);
        });
      }, []);

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
                        <Text style={styles.textCategory}>{category.name}</Text>
                    </TouchableOpacity>
                }) : ""
            }
        </View>
    )
}

const styles = StyleSheet.create({
    categoriesType: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        marginHorizontal: 5,
        gap: 8,
        marginBottom: 20,
    },
    category: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: 'black',
    },
    textCategory: {
        color: '#EF8481',
    },
    checked: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        opacity: 0.5,
        transform: [
            { scale: 1.1 }
        ]
    }
})

export default SearchCategories