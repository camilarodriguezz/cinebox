import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput, Alert } from 'react-native';
import variables from './variables'
import { CineboxContext } from './CineboxProvider';

export default function Edit(props) {

    const movie = props.navigation.getParam('movie', null)
    const [title, setTitle] = useState(movie.title)
    const [description, setDescription] = useState(movie.description)
    const token = CineboxContext._currentValue.token

    // const getToken = () => {
    //     AsyncStorage.getItem('Boxd_Token')
    //         .then(response => setToken(response))
    //         .catch(error => console.log(error));
    // }

    // useEffect(() => {
    //     getToken();
    // }, []);

    const saveMovie = () => {
        // if (movie.id) {
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
                Alert.alert("Edited Movie")
                props.navigation.navigate('Detail', { movie: movie, title: movie.title })
            })
            .catch(err => console.log(err))
    }


    const removeClicked = () => {
        const movie = props.navigation.getParam('movie')
        fetch(`${variables.ip_address}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                props.navigation.state.params.setRefresh(!props.navigation.state.params.refresh);
                props.navigation.navigate('MovieList')
            })
            .catch(err => console.log(err))
    }

    Edit.navigationOptions = screenProps => ({
        title: screenProps.navigation.getParam('title'),
        headerStyle: {
            backgroundColor: 'orange',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
        },
        headerRight: () =>
            <Button title='Remove' color='white' onPress={() => removeClicked()} />
    })

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
            <View style={styles.btn}>
                <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10,
        alignItems: 'center',
    },
    label: {
        color: 'white',
        padding: 10,
        fontSize: 25,
        fontWeight: '700',
    },
    input: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '100%',
    },
    btn : {
        color: 'white',
        backgroundColor: '#FF9900',
        width: 130,
        height: 40,
        borderRadius: 10,
        margin: 20
    },
});
