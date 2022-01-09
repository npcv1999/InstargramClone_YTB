import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Divider } from 'react-native-elements'


const BottomTabMain = ({ icons }) => {
    const [activeTab, setActiveTab] = useState("Home")

    const Icons = ({ icon }) => {
        return (
            <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
                <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
                    style={[styles.iconImg,
                    icon.name === "Profile" && styles.profilePic(),
                    activeTab === "Profile" && icon.name === activeTab && styles.profilePic(activeTab)]}></Image>
            </TouchableOpacity>
        )
    }
    return (
        <View style={Platform.OS === "ios" ? styles.wrapper : null}>
            <Divider width={0.5} orientation='vertical'></Divider>
            <View style={styles.container}>
                {icons.map((icon, index) => {
                    return (<Icons key={index} icon={icon}></Icons>)
                })}
            </View>
        </View>
    )
}

export default BottomTabMain

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        width: "100%",
        bottom: "3%",
        zIndex: 100,
        backgroundColor: "#000"
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10
    },
    iconImg: {
        width: 25,
        height: 25
    },
    profilePic: (activeTab = "") => ({
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: activeTab === "Profile" ? 2 : 0
    })
})
