import React, { useState } from 'react';
import axios from 'axios'
import { StyleSheet, Text, TextInput, View, Image, Button, ScrollView, TouchableHighlight, Modal } from 'react-native';

export default function Search() {



    const [state, setState] = useState({
        s: '',
        results: [],
        selected: {},
    })

    const search = () => {
        axios(apiurl + extra + "&" + key + "&s=" + state.s).then(({ data }) => {
            let results = data.Search;
            console.log("axios 1 results ", results);
            setState(prevState => {
                return { ...prevState, results: results }
            })
        })
    }

    const openPopup = (id) => {
        axios(apiurl +"i="+id+"&"+key).then(({ data }) => {
            let result = data;
            console.log("axios 2 result ", result)
            setState(prevState => {
                return { ...prevState, selected: result }
            })
        })
    }
    // console.log("the state results!!!!! ", state.results[0].imdbID);
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cinebox Movie Search</Text>
            <TextInput
                style={styles.searchBox}
                onChangeText={text => setState(prevState => {
                    return { ...prevState, s: text }
                })}
                onSubmitEditing={search}
                value={state.s}
            />

            <ScrollView style={styles.results}>
                {state.results.map((result, index) =>
                    <TouchableHighlight key={result.imdbID} onPress={() => openPopup(result.imdbID)}>
                        <View key={result.imdbID} style={styles.result}>
                            <Image style={styles.poster} source={{ uri: result.Poster }} />
                            <Text style={styles.heading}>{result.Title}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            </ScrollView>
            
            <Modal animationType="fade" transparent={false} visible={(typeof state.selected.Title != 'undefined')}>
                <Text>Hello World!</Text>
            </Modal>
            <View style={styles.line2} />
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
        paddingTop: 50,
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
    },
    heading: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: '#445565',
        marginBottom: 10,
    },
    poster: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    line2: {
        borderBottomWidth: 75,
    },

});