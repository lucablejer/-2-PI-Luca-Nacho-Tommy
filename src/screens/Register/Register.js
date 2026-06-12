import React, { useState } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { auth, db } from "../Firebase/Config";

function Register(props){
    const [mail, setEmail] = useState ([])
    const [password, setPassword] = useState ([])
    const [userName, setUserName] = useState ([])
     const[error, setError]=useState(null);


    function onSubmit(){
        auth.createUserWithEmailAndPassword(mail, password)
        .then(response => {
            db.collection("users").add({
                email: auth.currentUser.email,
                userName: userName,
                createdAt: Date.now(),
            })
            .then(res => {
                props.navegation.navigate("Login")
            })
            setRegister(true);
        })
        .catch( error => {
            setError("")
            console.log(error)
        })
    }

    return(
        <View style={styles.container}>

            <Text>Register</Text>

            <TextInput style={styles.title}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text => setEmail(text)}
            value={mail}/>

            <TextInput style={styles.title}
            keyboardType="default"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}/>

            <TextInput style={styles.title}
            keyboardType="default"
            placeholder="Username"
            secureTextEntry={false}
            onChangeText={text => setUserName(text)}
            value={userName}/>

            {error ? <Text>{error}</Text> : null}

            <Pressable onPress={()=> onSubmit()}>
                <Text>Register</Text>
            </Pressable>

            <Pressable onPress={() => props.navegation.navigate("Login")}>
                <Text>Already Signed In?</Text>
            </Pressable>

        </View>
    )
}

export default Register; 