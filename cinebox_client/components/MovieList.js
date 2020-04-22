import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import variables from './variables'

export default function MovieList(props) {

    const [movies, setMovies] = useState([])
    const [refresh, setRefresh] = useState(false)
    
    const getMovies = (token) => {
        console.log("got here getMovies")
        
        fetch(`${variables.ip_address}/api/movies/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(jsonRes => setMovies(jsonRes))
            .catch(err => console.log(err))
    }

    const getData = () => {
        AsyncStorage.getItem('Boxd_Token')
        .then(response => getMovies(response))
        .catch(error => props.navigation.navigate('Auth'));
    }

    useEffect(() => {
        getData();
    }, [refresh]);

    const movieClicked = (movie) => {
        setRefresh(!refresh)
        props.navigation.navigate('Detail', { movie: movie, title: movie.title, refresh, setRefresh})
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/MR_logo.png')} />
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => movieClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>

                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

MovieList.navigationOptions = screenProps => ({
    title: "List of Movies",
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerRight: () =>
        <Button title='Add New' color='white'
            onPress={() => screenProps.navigation.navigate('Edit', { movie: { title: '', description: '' } })} />
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: 'black',
    },
    itemText: {
        color: 'white',
        fontSize: 24,
    },
    image: {
        width: '100%',
        height: 125,
    }
});