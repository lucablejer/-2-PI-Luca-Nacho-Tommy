import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../../Firebase/config';

function CreatePost(props){
    const [descripcion, setDescripcion] = useState("");
    const [error, setError] = useState("");

    function onSubmit(){
        if(descripcion === ""){
            setError("Debes ingresar una descripcion")
            return
        }

        db.collection("posts").add({
            owner: auth.currentUser.email,
            description: descripcion,
            likes: [],
            createdAt: Date.now(),
        })
        .then(() => {
            setDescripcion("")
            setError("")
            props.navigation.navigate("Home")
        })
        .catch(e => {
            setError("Error al crear el posteo")
            console.log(e)
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Crear Posteo</Text>

            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="Escribe tu posteo..."
            onChangeText={text => setDescripcion(text)}
            value={descripcion}/>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Publicar</Text>
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
        height: 100,
        textAlignVertical: "top",
    },
    error: {
        color: "red",
        marginBottom: 16,
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

export default CreatePost;