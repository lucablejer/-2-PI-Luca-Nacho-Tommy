import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, TextInput, StyleSheet} from 'react-native';
import { auth, db } from "../../firebase/config";
import { FlatList } from 'react-native-web';

function Profile(props){
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
            renderItem={({item}) => <Posteos item={item} navigation={props.navigation}/>}
            />

            <Pressable onPress={logout}>
                <Text>Cerrar sesion</Text>
            </Pressable>
        </View>
    )
}

export default Profile;