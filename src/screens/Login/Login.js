import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, TextInput, StyleSheet} from 'react-native';
import { auth } from "../../firebase/config";

function Login(props){
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");


    const[error, setError]=useState("") ;

    function onSubmit(){
        auth.signInWithEmailAndPassword(email, password)
        .then(()=> {
            props.navigation.navigate("HomeTab")
        })
        .catch(error => {
            setError("El email y/o la contrasena son incorrectos (" + error.message + ")")
        })
    }

    useEffect(()=> {
        auth.onAuthStateChanged(user =>{
            if(user){
                props.navigation.navigate("HomeTab")
            } 
            console.log(user)
        })
    }, [])

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>Iniciar Sesion</Text>

            <TextInput style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => setEmail(text)}
            value={email}/>

            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="contrasena"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}/>

            {error ? <Text styles = {styles.error}>{error}</Text> : null}

            <Pressable style = {styles.button} onPress={()=> onSubmit()}>
                <Text style = {styles.buttonText}>iniciar sesion</Text>
            </Pressable>

            <Pressable style = {styles.button} onPress={()=> props.navigation.navigate("Register")}>
                <Text style = {styles.buttonText}>No tenes cuenta? Registrate</Text>
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
    error:{
        color:"red",
        marginBottom: 16,
    }
})

export default Login;

