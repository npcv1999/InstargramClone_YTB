import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { USER } from '../../../utils/datas'

const Stories = () => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {USER.map((item, index) => (
                    <View key={index} style={styles.containerStories} >
                        <Image style={styles.storyImg} source={{ uri: item.image }}></Image>
                        <Text style={{ color: "white" }}>{item.user.length > 10 ? item.user.slice(0, 6).toLowerCase() + '...' : item.user.toLowerCase()}</Text>
                    </View>))}
            </ScrollView>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    containerStories: {
        alignItems: "center"
    },
    storyImg: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginLeft: 16,
        borderWidth: 3,
        borderColor: "#ff8501"
    }
})
