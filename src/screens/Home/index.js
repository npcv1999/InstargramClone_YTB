import React, { useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { db } from '../../api/firebase/config'
import BottomTabMain from '../../navigation/BottomTabMain'
import { bottomTabIcons, POSTS } from '../../utils/datas'
import Header from './Components/Header'
import Post from './Components/Post'
import Stories from './Components/Stories'

export default function HomeScreen() {
    const [listPost, setListPost] = useState([]);

    useEffect(() => {
        db.collectionGroup('posts').orderBy("createdAt","desc").onSnapshot(snapshot=>{
            setListPost(snapshot.docs.map(doc=>({id:doc.id,...doc.data()})))
        })
    }, []);
    
    console.log("POST",listPost)
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                    <Stories />
                    {listPost.map((post, index) => {
                        return (<Post post={post} key={index} />)
                    })}
                </ScrollView>
                <BottomTabMain icons={bottomTabIcons}></BottomTabMain>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
})

