import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput } from 'react-native';
import variables from './variables'

export default function Edit(props) {

    const movie = props.navigation.getParam('movie', null)
    const [title, setTitle] = useState(movie.title)
    const [description, setDescription] = useState(movie.description)

    const getData = () => {
        AsyncStorage.getItem('Boxd_Token')
        .then(response => {
            
        })
        .catch(error => props.navigation.navigate('Auth'));
    }

    useEffect(() => {
        getData();
    }, []);

    const saveMovie = () => {
        AsyncStorage.getItem('Boxd_Token')
        .then(token => {
            if (movie.id) {
                fetch(`${variables.ip_address}/api/movies/${movie.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: title, description: description })
                })
                    .then(res => res.json())
                    .then(movie => {
                        props.navigation.navigate('Detail', { movie: movie, title: movie.title })
                    })
                    .catch(err => console.log(err))
            } else {
                fetch(`${variables.ip_address}/api/movies/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: title, description: description })
                })
                    .then(res => res.json())
                    .then(movie => {
                        props.navigation.navigate('MovieList')
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(error => props.navigation.navigate('Auth'));
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input} placeholder="Title"
                onChangeText={text => setTitle(text)} value={title}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input} placeholder="Description"
                onChangeText={text => setDescription(text)} value={description}
            />
            <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
        </View>
    );
}

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerRight: () =>
        <Button title='Remove' color='white'
            onPress={() => removeClicked(screenProps)} />
})

const removeClicked = (props) => {
    const movie = props.navigation.getParam('movie')
    fetch(`${variables.ip_address}/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            props.navigation.navigate('MovieList')
        })
        .catch(err => console.log(err))
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    label: {
        fontSize: 20,
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
    }
});