import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ROUTES } from '../../../navigation/Route'
import { Images } from '../../../utils/images'
import {firebase} from '../../../api/firebase/config';

const handleSignOut = async()=>{
    try {
        await firebase.auth().signOut()
        console.log("Signed out success")
    } catch (error) {
        console.log(error.message)
    }
}

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>handleSignOut()}>
                <Image style={styles.logoHeader} source={Images.logoHeader} resizeMode='contain'></Image>
            </TouchableOpacity>
            <View style={styles.containerBtn}>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AddNewPost)}>
                    <Image style={styles.icon} source={Images.add}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Images.heart}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>20</Text>
                    </View>
                    <Image style={styles.icon} source={Images.chat}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20
    },
    logoHeader: {
        width: 100,
        height: 50
    },
    containerBtn: {
        flexDirection: "row"
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 15,
        tintColor: "white",
        resizeMode: "contain"
    },
    unreadBadge: {
        backgroundColor: "#ff3250",
        position: "absolute",
        width: 25,
        height: 18,
        borderRadius: 25,
        left: 20,
        bottom: 18,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
    },
    unreadBadgeText: {
        color: "white",
        fontWeight: "600",
        fontSize: 13
    }
})
