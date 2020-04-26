import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import variables from './variables';
import { CineboxContext } from './CineboxProvider';


export default function MovieList(props) {

    console.log('MovieList context Token', CineboxContext._currentValue.token);

    const [movies, setMovies] = useState([])
    // const [refresh, setRefresh] = useState(CineboxContext._currentValue.refresh)

    const [refresh, setRefresh] = useState(false)
    const [token, setToken] = useState(null)

    CineboxContext._currentValue.setToken(token)
    CineboxContext._currentValue.refresh = !CineboxContext._currentValue.refresh

    const getMovies = (token) => {
        console.log("got here getMovies")
        fetch(`${variables.ip_address}/api/movies/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(jsonRes => {
                setMovies(jsonRes)
            })
            .catch(err => console.log(err))
    }

    const getData = () => {
        AsyncStorage.getItem('Boxd_Token')
            .then(response => {
                getMovies(response)
                setToken(response)
            })
            .catch(error => props.navigation.navigate('Auth'));
    }

    useEffect(() => {
        getData();
    }, [refresh]);

    const movieClicked = (movie) => {
        props.navigation.navigate('Detail', { movie: movie, title: movie.title, })
        setRefresh(!refresh)
    }

    return (
        <View style={styles.container} >
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
            <View style={styles.line2} />
        </View>
    );
}

MovieList.navigationOptions = screenProps => ({
    title: "List of Movies",
    headerStyle: {
        backgroundColor: '#FF9900'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerRight: () =>
        <Button title='Add New +' color='white' onPress={() => screenProps.navigation.navigate('AddNew')} />,
    headerLeft: () =>
        <Button title='Search' color='white' onPress={() => screenProps.navigation.navigate('Search')} />,
})

// AsyncStorage.getItem('Boxd_Token')
//             .then(response => props.navigation.navigate('MovieList'))
//             .catch(error => {
//                 console.log(error);

//             });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
    },
    item: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: '#445565',
        margin: 10,
    },
    itemText: {
        color: 'white',
        fontSize: 24,
    },
    image: {
        width: '100%',
        height: 125,
    },
    line: {
        borderBottomColor: '#282C35',
        borderBottomWidth: 4,
    },
    line2: {
        borderBottomColor: '#FF9900',
        borderBottomWidth: 75,
    },
});