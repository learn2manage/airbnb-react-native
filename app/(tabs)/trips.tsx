import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const Page = () => {
    const categories = [
        {
          name: 'Tiny homes',
          icon: 'home',
        },
        {
          name: 'Cabins',
          icon: 'house-siding',
        },
        {
          name: 'Trending',
          icon: 'local-fire-department',
        },
        {
          name: 'Play',
          icon: 'videogame-asset',
        },
        {
          name: 'City',
          icon: 'apartment',
        },
        {
          name: 'Beachfront',
          icon: 'beach-access',
        },
        {
          name: 'Countryside',
          icon: 'nature-people',
        },
    ];
    
    return (
        <View style={{ flex: 1, marginTop: 80 }}>
    
      
        
    
    <Stack.Screen options={{
        headerShown:false
      }} />
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
                            <View style={styles.container}>
        
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    
                                    contentContainerStyle={{
                                        flexGrow:1, 
                                        alignItems: 'center',
                                        gap: 20,
                                        paddingHorizontal: 16,

                                    }}>
                                    {categories.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.categoriesBtn
                                            }
                                        >
                                            <MaterialIcons
                                                name={item.icon as any}
                                                size={24}
                                                color={
                                                    '#000'
                                                }></MaterialIcons>
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
     
                        </SafeAreaView>
            
        
                {/* }}
            /> */}
        </View>
    );

    
}

export default Page;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: 130,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 10,
        },
    },
    scrollView: {
        height: '20%',
        width: '80%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'lightblue'
      },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
      },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
})