import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

function Home(props){
    const[posteos, setPosteos] = useState([]);
    const[cargando, setCargando] = useState(true);

    useEffect(()=> {
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(docs => {
            var postsArray = [];
            docs.forEach(doc =>{
                postsArray.push({id: doc.id, data: doc.data()})
            })
            setPosteos(postsArray)
            setCargando(false)
        })
    }, [])

    function likear(postId, likesArray){
        var email = auth.currentUser.email;
        if(likesArray.includes(email)){
            db.collection("posts").doc(postId).update({
                likes: firebase.firestore.FieldValue.arrayRemove(email)
            })
        } else{
            db.collection("posts").doc(postId).update({
                likes: firebase.firestore.FieldValue.arrayUnion(email)
            })
        }
    }

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>Home</Text>

            {cargando ? (
                <ActivityIndicator size="large" color="#185FA5"/>
            ):(
                <FlatList
                    data={posteos}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Posteos item={item} navigation={props.navigation}/>}
                />
            )}
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
        backgroundColor: "#185FA5",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 8,
    },
    buttonText:{
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
})

export default Home;