import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormikUpload from './FormikUpload'

const HeaderAdd = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={{ uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png" }} style={{ width: 30, height: 30, resizeMode: "contain" }}></Image>
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
        </View>
    )
}

const AddNewPost = () => {
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.container}>
                <HeaderAdd />

                {/* FormikPostUpload */}
                <FormikUpload />
            </View>
        </SafeAreaView>
    )
}

export default AddNewPost

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        marginHorizontal: 10
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerText: {
        flex: 1,
        color: "#fff",
        fontWeight: "900",
        fontSize: 20,
        marginRight: 30,
        textAlign: "center"
    }
})
