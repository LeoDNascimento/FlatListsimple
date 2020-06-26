import React, { useState, useEffect } from 'react';
import {SafeAreaView,FlatList, Text, StyleSheet, StatusBar} from 'react-native';
import api from './services/api';

export default function App(){  
    const [repositories, setRepositories] = useState([]);
    

    useEffect(() =>{
        api.get('repositories').then(response=> {
            console.log(response.data);
            setRepositories(response.data);
        });
    }, []);


    return (
        <>
    <StatusBar barStyle= 'light-content' backgroundColor= "#7159d1" translucent />
    {/* <View style={styles.container}>
        {repositories.map(repositorie => (
        <Text key={repositorie.id} style={styles.title}>
            {repositorie.title}
        </Text>))}
    </View> */}
    <SafeAreaView style={styles.container}>
    <FlatList
    
    data={repositories}
    keyExtractor={repositorie=> repositorie.id}
    renderItem={({item: repositorie}) =>(
        <Text style={styles.title}>
            {repositorie.title}
        </Text>
    )}
    />
    </SafeAreaView>
    </>
    
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159d1',
         justifyContent: 'center',
         alignItems: 'center',
    },
    title:{
        fontSize: 20,
        color: '#FFF',
        fontWeight: "bold"
    }
});