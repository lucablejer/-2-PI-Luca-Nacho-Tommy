import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, Pressable, StyleSheet, ActivityIndicator} from 'react-native';
import {db, auth} from '../../firebase/config';

function CommentPost(props){
    const[comentario, setComentario] = useState("");
    const[comentarios, setComentarios] = useState([]);
    const[error, setError] = useState("");
    const[cargando, setCargando] = useState(true);
    var postId = props.route.params.id;

    useEffect(()=> {
        db.collection("comments").where("postId", "==", postId).onSnapshot(docs =>{
            var commentsArray = [];
            docs.forEach(doc =>{
                commentsArray.push({id: doc.id, data: doc.data()})
            })
            setComentarios(commentsArray)
            setCargando(false)
        })
    }, [])

    function enviarComentario(){
        if(comentario === ""){
            setError("Escribe un comentario")
            return
        }

        db.collection("comments").add({
            owner: auth.currentUser.email,
            postId: postId,
            texto: comentario,
            createdAt: Date.now(),
        })
        .then(()=>{
            setComentario("")
            setError("")
        })
        .catch(e =>{
            setError("Error al comentar")
            console.log(e)
        })
    }

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>Comentarios</Text>

            {cargando ?(
                <ActivityIndicator size="large" color="#185FA5"/>
            ):(
                <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({item})=>
                    <View style={styles.card}>
                        <Text style={styles.owner}>{item.data.owner}</Text>
                        <Text>{item.data.texto}</Text>
                    </View>
                }
                />
            )}

            <TextInput style={styles.input}
            keyboardType="default"
            placeholder="Escribe un comentario..."
            onChangeText={ text => setComentario(text)}
            value={comentario}/>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={()=> enviarComentario()}>
                <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
    },
    titulo:{
        fontSize: 28,
        fontWeight: "500",
        marginBottom: 24,
    },
    card:{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    owner:{
        fontWeight: "500",
        marginBottom: 4,
    },
    input:{
        borderWidth: 1,
        borderColor:"#ccc",
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
        marginBottom: 8,
    },
    buttonText:{
        color:"white",
        fontSize: 16,
        fontWeight:"500",
    },
})

export default CommentPost;