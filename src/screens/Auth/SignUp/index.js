import React from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, Image, StyleSheet } from 'react-native'
import { Images } from '../../../utils/images';
import SignUpForm from './components/SignUpForm';

const SignUpScreen = () => {
    const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
    return (
        <KeyboardAvoidingView behavior={behavior} style={styles.flex}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: Images.logo_main, width: 100, height: 100 }}></Image>
                    </View>
                    {/* SignUpForm */}
                    <SignUpForm />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 12
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 60
    }
})
