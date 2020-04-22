import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorage } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import variables from './variables'

export default function Detail(props) {

    const movie = props.navigation.getParam('movie', null);
    // const token = props.navigation.getParam('token', '');
    const [highlight, setHighlight] = useState(0);
    //useeffect -> get token -> get request -> setState

    const rateClicked = (token) => {
        console.log("the detail token kkkk ", token);

        if (highlight > 0 && highlight < 6) {
            fetch(`${variables.ip_address}/api/movies/${movie.id}/rate_movie/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stars: highlight })
            })
                .then(res => res.json())
                .then(res => {
                    setHighlight(0)
                    Alert.alert("Rating", res.message)
                })
                .catch(err => console.log(err))
        }
    }

    const getToken = () => {
        AsyncStorage.getItem('Boxd_Token')
            .then(response => rateClicked(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={faStar} />
                <Text style={styles.white}>({movie.num_of_ratings})</Text>
            </View>
            <Text style={styles.description}>{movie.description}</Text>
            <View style={styles.stars} />
            <Text style={styles.description}>Rate the Movie!!!</Text>
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={highlight > 0 ? styles.purple : styles.gray} icon={faStar} size={48} onPress={() => setHighlight(1)} />
                <FontAwesomeIcon style={highlight > 1 ? styles.purple : styles.gray} icon={faStar} size={48} onPress={() => setHighlight(2)} />
                <FontAwesomeIcon style={highlight > 2 ? styles.purple : styles.gray} icon={faStar} size={48} onPress={() => setHighlight(3)} />
                <FontAwesomeIcon style={highlight > 3 ? styles.purple : styles.gray} icon={faStar} size={48} onPress={() => setHighlight(4)} />
                <FontAwesomeIcon style={highlight > 4 ? styles.purple : styles.gray} icon={faStar} size={48} onPress={() => setHighlight(5)} />
                <Button title="Rate Movie!" onPress={() => rateClicked()} />
            </View>
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
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
        <Button title='Edit' color='white'
            onPress={() => screenProps.navigation.navigate('Edit', { movie: screenProps.navigation.getParam('movie') })} />
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: 'gray',
    },
    itemText: {
        color: 'white',
        fontSize: 24,
    },
    image: {
        width: '100%',
        height: 125,
        paddingTop: 30,
        // resizeMode: 'contain',
    },
    starContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    orange: {
        color: 'orange'
    },
    white: {
        color: 'white'
    },
    purple: {
        color: 'purple'
    },
    gray: {
        color: 'gray'
    },
    description: {
        fontSize: 20,
        color: 'white',
        padding: 10,
    },
    stars: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    }
});