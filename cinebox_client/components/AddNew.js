import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TextInput, Alert, TouchableHighlight } from 'react-native';
import variables from './variables'
import {CineboxContext} from './CineboxProvider';

export default function AddNew() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const token = CineboxContext._currentValue.token

    const addMovie = () => {
            fetch(`${variables.ip_address}/api/movies/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, description: description, image: image })
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
            <TextInput style={styles.input} placeholder="Title" onChangeText={text => setTitle(text) }/>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder="Description" onChangeText={text => setDescription(text)} />
            <Text style={styles.label}>Image</Text>
            <TextInput style={styles.input} placeholder="Image URL" onChangeText={text => setImage(text)} />
            <View style={styles.btn}>
            <Button color="#fff" onPress={() => addMovie()} title={"Add Movie!"} />
            </View>
        </View>
    )
}

AddNew.navigationOptions = () => ({
    title: "Add Movie",
    headerStyle: {
        backgroundColor: '#FF9900',
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
        color: '#fff',
        backgroundColor: '#FF9900',
        width: 130,
        height: 40,
        borderRadius: 10,
        margin: 20
    },
});