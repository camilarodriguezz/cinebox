import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';


export default function Edit(props) {

    const movie = props.navigation.getParam('movie', null)
    const token = props.navigation.getParam('token', '')
    const [title, setTitle] = useState(movie.title)
    const [description, setDescription] = useState(movie.description)
    console.log('token', token)

    const saveMovie = () => {
        if (movie.id) {
            fetch(`http://10.0.0.197:8000/api/movies/${movie.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(movie => {
                    props.navigation.navigate("Detail", { movie: movie, title: movie.title })
                })
                .catch(error => console.log(error));
        } else {
            fetch(`http://10.0.0.197:8000/api/movies/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(movie => {
                    props.navigation.navigate("MovieList")
                })
                .catch(error => console.log(error));
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <Button
                onPress={() => saveMovie()}
                title={movie.id ? "Edit" : "Add"}
            />
        </View>
    );
}

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerRight: () =>
        <Button
            title='Remove'
            color='white'
            onPress={() => removeClicked(screenProps)}
        />
})

const removeClicked = (props) => {
    const movie = props.navigation.getParam('movie')
    fetch(`http://10.0.0.197:8000/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token 6759d14d9c481720c42e8b6f2c2cfa59f2ba2572`,
            'Content-Type': 'application/json'
        },
    })
        .then(movie => {
            props.navigation.navigate("MovieList")
        })
        .catch(error => console.log(error));
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10,
    },
    label: {
        fontSize: 24,
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
