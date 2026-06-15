import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { auth, db } from "../../firebase/config";

function Register(props){
    const [mail, setEmail] = useState ("") 
    const [password, setPassword] = useState ("")
    const [userName, setUserName] = useState ("")
     const[error, setError]=useState("");


    function onSubmit(){
        auth.createUserWithEmailAndPassword(mail, password)
        .then(response => {
            db.collection("users").add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now(),
            })
            .then(res => {
                props.navigation.navigate("Login")
            })
            //setRegister(true);
        })
        .catch( error => {
            setError(error.message)
            console.log(error)
        })
    }

    return(
        <View style={styles.container}>

            <Text style = {styles.titulo}>Register</Text>

            <TextInput style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => setEmail(text)}
            value={mail}/>

            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}/>

            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="Username"
            secureTextEntry={false}
            onChangeText={text => setUserName(text)}
            value={userName}/>

            {error ? <Text style = {styles.error}>{error}</Text> : null}

            <Pressable style = {styles.button} onPress={()=> onSubmit()}>
                <Text style = {styles.buttonText}>Register</Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate("Login")}>
                <Text>Already Signed In?</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    titulo:{
        fontSize: 28,
        fontWeight: "500",
        marginBottom: 24,
    },
    input:{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    error:{
        color:"red",
        marginBottom: 16,
    },
    button:{
        backgroundColor:"#185FA5",
        padding: 14,
        borderRadius: 8,
        alignItems:"center",
        marginBottom: 16,
    },
    buttonText:{
        color:"white",
        fontSize: 16,
        fontWeight:"500",
    },
})



export default Register; 