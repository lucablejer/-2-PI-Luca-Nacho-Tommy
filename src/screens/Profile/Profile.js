import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {auth, db} from '../../firebase/config';
import Posteos from '../../Components/Posteos/Posteos';

function Profile(props){
    const[posteos, setPosteos] = useState([]);
    const[userName, setUserName] = useState("");
    const[cargando, setCargando] = useState(true);

    useEffect(()=> {
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(docs =>{
            docs.forEach(doc =>{
                setUserName(doc.data().userName)
            })
        })

        db.collection("posts").where("owner", "==", auth.currentUser.email).onSnapshot(docs =>{
            var postsArray = [];
            docs.forEach(doc =>{
                postsArray.push({id: doc.id, data: doc.data()})
            })
            setPosteos(postsArray)
            setCargando(false)
        })
    }, [])

    function logout(){
        auth.signOut()
        .then(()=> props.navigation.navigate("Login"))
        .catch(error => console.log(error))
    }

    return(
        <View style={styles.container}>

            <Text style={styles.titulo}>{userName}</Text>
            <Text style={styles.email}>{auth.currentUser.email}</Text>

            {cargando ?(
                <ActivityIndicator size="large" color="#185FA5"/>
            ):(
                <FlatList
                data={posteos}
                keyExtractor={item => item.id}
                renderItem={({item})=> <Posteos item={item} navigation={props.navigation}/>}
                />
            )}

            <Pressable style={styles.button} onPress={()=> logout()}>
                <Text style={styles.buttonText}>Cerrar sesion</Text>
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
        marginBottom: 4,
    },
    email:{
        fontSize: 16,
        color:"#666",
        marginBottom: 24,
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

export default Profile;