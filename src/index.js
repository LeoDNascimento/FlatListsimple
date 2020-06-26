import React, { useState, useEffect } from 'react';
import {SafeAreaView,FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import api from './services/api';

export default function App(){  
    const [repositories, setRepositories] = useState([]);
    

    useEffect(() =>{
        api.get('repositories').then(response=> {
            console.log(response.data);
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepo(){
        const response = await api.post('repositories', {
            title: `Novo repo ${Date.now()}`,
            techs: "Node",
            url:"www.github.com/leo"
        });
        const repositorie = response.data;
        setRepositories([...repositories, repositorie]);
    }


    return (
        <>
    <StatusBar barStyle= 'light-content' backgroundColor= "#7159d1" translucent />
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

    <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddRepo}>
        <Text style={styles.buttonText}>Adicionar repositorio</Text>
    </TouchableOpacity>
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
    },
    button:{
        backgroundColor:'#FFF',
        margin: 20,
        height: 50,
        width: 300,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});