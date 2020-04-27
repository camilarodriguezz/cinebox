import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl, ScrollView, Image, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import variables from './variables';
import { CineboxContext } from './CineboxProvider';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function MovieList(props) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);


    const [movies, setMovies] = useState([])
    const [token, setToken] = useState(null)

    CineboxContext._currentValue.setToken(token)
    CineboxContext._currentValue.refresh = !CineboxContext._currentValue.refresh

    const getMovies = (token) => {
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
    console.log('movies', movies);


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
    }, [refreshing]);

    const movieClicked = (movie) => {
        props.navigation.navigate('Detail', { movie: movie, title: movie.title, })
        // setRefresh(!refresh)
    }

    return (
        <View style={styles.container} >
            <Image style={styles.image} source={require('../assets/cinebox.png')} />

            <ScrollView style={styles.item} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {movies.reverse().map((item, index) =>
                    <TouchableOpacity key={index} onPress={() => movieClicked(item)}>
                        <View key={index} style={styles.item}>
                            <Image style={styles.movieImg} source={{ uri: item.image }} />
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>

            <View style={styles.line2} />
        </View>
    );
}

MovieList.navigationOptions = screenProps => ({
    title: "Movie List",
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    image: {
        width: 220,
        height: 100,
    },
    item: {
        flex: 1,
        width: '100%',
    },
    itemText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: '#445565',
        marginBottom: 20,
    },
    movieImg: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    line2: {
        borderBottomWidth: 50,
    },
});