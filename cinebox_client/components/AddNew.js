import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput, Alert } from 'react-native';
import variables from './variables'
import {CineboxContext} from './CineboxProvider';

export default function AddNew() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const token = CineboxContext._currentValue.token

    const addMovie = () => {
            fetch(`${variables.ip_address}/api/movies/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description })
            })
                .then(res => res.json())
                .then(res => {
                    Alert.alert("Added Movie")
                    props.navigation.navigate('MovieList')
                })
                .catch(err => console.log(err))
        }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input} placeholder="Title"
                onChangeText={text => setTitle(text) } 
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input} placeholder="Description"
                onChangeText={text => setDescription(text)} 
            />
            <Button onPress={() => addMovie()} title={"Add Movie!"} />
        </View>
    )
}

AddNew.navigationOptions = () => ({
    headerStyle: {
        backgroundColor: 'orange',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
})


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