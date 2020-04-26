import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, AsyncStorage } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import variables from './variables'
import {CineboxContext} from './CineboxProvider';

export default function Detail(props) {

    const movie = props.navigation.getParam('movie', null);
    const token = CineboxContext._currentValue.token
    // const [detail, setDetail] = useState({})
    const [highlight, setHighlight] = useState(0);
    CineboxContext._currentValue.refresh = !CineboxContext._currentValue.refresh
    

    useEffect(() => {
        fetch(`${variables.ip_address}/api/movies/${movie.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
            .then(res => res.json())
            .then(jsonRes => {
                setDetail(jsonRes)
            })
            .catch(err => console.log(err))
    }, [highlight]);

    const rateClicked = () => {
        console.log("rating token, ", token);

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

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={faStar} size={28} />
                <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={faStar} size={30} />
                <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={faStar} size={32} />
                <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={faStar} size={34} />
                <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={faStar} size={36} />
                <Text style={styles.white}>({movie.num_of_ratings})</Text>
            </View>
            <Text style={styles.description}>{movie.description}</Text>
            <View style={styles.stars} />
            <Text style={styles.description}>Rate the Movie!!!</Text>
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={highlight > 0 ? styles.orange : styles.gray} icon={faStar} size={48} onPress={() => setHighlight(1)} />
                <FontAwesomeIcon style={highlight > 1 ? styles.orange : styles.gray} icon={faStar} size={50} onPress={() => setHighlight(2)} />
                <FontAwesomeIcon style={highlight > 2 ? styles.orange : styles.gray} icon={faStar} size={52} onPress={() => setHighlight(3)} />
                <FontAwesomeIcon style={highlight > 3 ? styles.orange : styles.gray} icon={faStar} size={54} onPress={() => setHighlight(4)} />
                <FontAwesomeIcon style={highlight > 4 ? styles.orange : styles.gray} icon={faStar} size={56} onPress={() => setHighlight(5)} />
            </View>
            <View style={styles.btn}>
            <Button title="Rate Movie!" onPress={() => rateClicked()} />
            </View>
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
    title: 'Movie Details',
    headerStyle: {
        backgroundColor: '#FF9900',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerRight: () =>
        <Button title='Edit' color='white'
            onPress={() => screenProps.navigation.navigate('Edit', { movie: screenProps.navigation.getParam('movie'), token: screenProps.navigation.state.params.token})} />
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        margin: 10
    },
    image: {
        width: '100%',
        height: 125,
        paddingTop: 30,
        // resizeMode: 'contain',
    },
    title : {
        color: '#fff',
        fontSize: 40,
        fontWeight: '700',
        padding: 20,
    },
    starContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    orange: {
        color: 'orange'
    },
    white: {
        color: 'white',
        fontSize: 25,
    },
    orange: {
        color: 'orange'
    },
    gray: {
        color: '#445565'
    },
    description: {
        fontSize: 25,
        color: 'white',
        padding: 10,
    },
    stars: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
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
