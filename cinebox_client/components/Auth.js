import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import variables from './variables';

export default function Auth(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [regView, setRegView] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const auth = () => {
        if (regView) {
            fetch(`${variables.ip_address}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
                .then(res => res.json())
                .then((res) => {
                    AsyncStorage.setItem('Boxd_Token', res.token)
                        .then(response => {
                            setRegView(false);
                            props.navigation.navigate("MovieList")
                        })
                        .catch(error => {
                            console.log(error)
                            // spinner and a retry for login until they log in or timeout
                            // error message
                        })
                })
                .catch(err => console.log(err))
        } else {
            fetch(`${variables.ip_address}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
                .then(res => res.json())
                .then((res) => {
                    AsyncStorage.setItem('Boxd_Token', res.token)
                        .then(response => props.navigation.navigate("MovieList"))
                        .catch(error => {console.log(error)
                            // spinner and a retry for login until they log in or timeout
                            // error message
                        })
                })
                .catch(error => console.log(error));
        }
    }

    const getData = () => {
        AsyncStorage.getItem('Boxd_Token')
            .then(response => props.navigation.navigate('MovieList'))
            .catch(error => {
                console.log(error);
                
            });
    }

    const toggleView = () => {
        setRegView(!regView);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input} placeholder="Username"
                onChangeText={text => setUsername(text)} value={username}
                autoCapitalize={'none'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input} placeholder="Description"
                onChangeText={text => setPassword(text)} value={password}
                autoCapitalize={'none'}
                secureTextEntry={true}
            />
            <Button onPress={() => auth()} title={regView ? 'Register' : 'Login'} />
            <TouchableOpacity onPress={() => toggleView()}>
                {regView ? <Text style={styles.viewText}>Already have an Acccoun? Go to Login!</Text> :
                    <Text style={styles.viewText}>Don't have an account? Register Here!</Text>}
            </TouchableOpacity>
        </View>
    );
}

Auth.navigationOptions = () => ({
    title: "Login/Registration",
    headerStyle: {
        backgroundColor: '#FF9900'
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
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    }
});
