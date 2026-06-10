import {useState, useEffect} from 'react';
import { Text, View, Pressable, TextInput, Pressable, StyleSheet} from 'react-native';
import { auth } from "../../Firebase/config";

function Login(){
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[error, setError]=useState(null);

    function onSubmit(){
        auth.signInwithEmailAndPassword(email, password)
        .then(()=> {
            props.navigation.navigate("Home")
        })
        .catch(error => {
            setError(error)
        })
    }

    useEffect(()=> {
        auth.onAuthStateChanged(user =>{
            console.log(user)
        })
    }, [])

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>Login</Text>

            <TextInput style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => setEmail(text)}
            value={email}/>

            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}/>

            {error ? <Text>{error}</Text> : null}

            <Pressable style={styles.button} onPress={()=> onSubmit()}>
                <Text>Login</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> props.navigation.navigate("Register")}>
                <Text>No tenes cuenta? Registrate</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    titulo: {
        fontSize: 28,
        fontWeight: "500",
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#185FA5",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
})

export default Login;

