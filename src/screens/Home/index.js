import React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import BottomTabMain from '../../navigation/BottomTabMain'
import { bottomTabIcons, POSTS } from '../../utils/datas'
import Header from './Components/Header'
import Post from './Components/Post'
import Stories from './Components/Stories'

export default function HomeScreen() {

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                    <Stories />
                    {POSTS.map((post, index) => {
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

