import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Image, Button, ScrollView, AsyncStorage } from 'react-native';

export default function Search() {

    const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=38e4a2a9";

    const [state, setState] = useState({
        s: '',
        results: [],
        selected: {},
    })

    // const [results, setResults] = useState([])
    // const [s, setS] = useState('')
    // const [state, setstate] = useState({})

    const search = () => {
        fetch(apiurl + "&s=" + state.s)
            .then(response => {
                return response.json();
            }).then(response => {
                console.log("responeroski ", response)
                setState.results([...response.Search])
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cinebox Movie Search</Text>
            <TextInput
                style={styles.searchBox} value={state.s}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, s: text }
                })}
                onSubmitEditing={search}
                value={state.s}
            />

            <ScrollView style={styles.results}>
                {state.results.map(result => {
                    <View key={result.imdbID} style={styles.result}>
                        <Text style={styles.heading}>{result.Title}</Text>
                    </View>
                })}
            </ScrollView>

        </View>
    );
}

Search.navigationOptions = props => ({
    title: "Search for Movies",
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerRight: () =>
        <Button title='Add New +' color='white' onPress={() => props.navigation.navigate('AddNew')} />,
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        paddingHorizontal: 20
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20
    },
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 48,
    },
    results: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
    heading: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: '#445565',
    }

});