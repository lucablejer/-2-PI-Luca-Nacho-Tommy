import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, FlatList} from 'react-native';
import { auth, db } from "../../Firebase/config";
import { FlatList } from 'react-native-web';

function Profile(){
    const[posteos, setPosteos]=useState([]);
    const currentUser = auth.currentUser

    useEffect(() => { db.collection('posteos').where('owner', '==', currentUser.email).onSnapshot(
        docs => {
            let posteos = [];
            docs.forEach(
                doc =>{
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                },
                setPosteos(posteos)
            )} )
    }, [])

    function logout(){
        auth.signOut()
            .then(() => props.navigation.navigate('Login'))
            .catch((error) => console.log(error))
    }

    return(
        <View>
            <Text>{auth.currentUser.displayName}</Text>
            <Text>{auth.currentUser.email}</Text>

            <FlatList
            data={posteos}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>}
            />

            <Pressable onPress={logout}>
                <Text>Cerrar sesion</Text>
            </Pressable>
        </View>
    )
}

export default Profile;