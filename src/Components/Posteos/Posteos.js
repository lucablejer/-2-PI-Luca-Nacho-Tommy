import React from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

function Posteos(props){
    const email = auth.currentUser?.email;
    const likes = props.item.data.likes || [];
    const yaDioLike = likes.includes(email);
}









//<View style={styles.card}>
                           //<Text style={styles.owner}>{item.data.owner}</Text>
                            //<Text style={styles.description}>{item.data.description}</Text>
                            //<Text style={styles.likes}>Likes: {item.data.likes.length}</Text>

                            //<Pressable onPress={()=> likear(item.id, item.data.likes)}>
                                //<Text>Me gusta</Text>
                            //</Pressable>

                            //<Pressable style={styles.button} onPress={()=> props.navigation.navigate("ComentarPosteo", {id: item.id})}>
                                //<Text style={styles.buttonText}>Comentar</Text>
                            //</Pressable>
                        //</View>