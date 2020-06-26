import React, { useState, useEffect } from 'react';
import {View,FlatList, Text, StyleSheet, StatusBar} from 'react-native';
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
    <FlatList
    style={styles.container}
    data={repositories}
    keyExtractor={repositorie=> repositorie.id}
    renderItem={({item: repositorie}) =>(
        <Text style={styles.title}>
            {repositorie.title}
        </Text>
    )}
    />
    </>
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159d1',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title:{
        fontSize: 120,
        color: '#FFF',
        fontWeight: "bold"
    }
});