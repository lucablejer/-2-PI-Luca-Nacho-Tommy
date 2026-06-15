import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {db, auth} from '../../firebase/config';
import firebase from 'firebase';

function Posteos(props){
    var item = props.item;
    var likes = item.data.likes;
    var email = auth.currentUser.email;

    function likear(){
        if(likes.includes(email)){
            db.collection("posts").doc(item.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(email)
            })
        } else{
            db.collection("posts").doc(item.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(email)
            })
        }
    }

    return(
        <View style={styles.card}>
            <Text style={styles.owner}>{item.data.owner}</Text>
            <Text style={styles.description}>{item.data.description}</Text>
            <Text style={styles.likes}>Likes: {likes.length}</Text>

            <Pressable style={styles.button} onPress={()=> likear()}>
                <Text style={styles.buttonText}>Me gusta</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> props.navigation.navigate("CommentPost", {id: item.id})}>
                <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    owner:{
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 4,
    },
    description:{
        fontSize: 14,
        marginBottom: 8,
    },
    likes:{
        fontSize: 14,
        marginBottom: 8,
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

export default Posteos;