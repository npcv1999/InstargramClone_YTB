import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { ROUTES } from '../../../../navigation/Route'
import { useNavigation } from '@react-navigation/native'
import {firebase,db} from '../../../../api/firebase/config';

const SignUpForm = () => {

    const navigation = useNavigation()

    const SignUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        username: Yup.string().required().min(2, "A username is required more than 2 characters"),
        password: Yup.string().min(6, "Your password has to have at least 8 characters")
    })

    const getRandomProfilePic =  async()=>{
        const res = await fetch("https://randomuser.me/api")
        const data = await res.json()
        return data.results[0].picture.large
    }

    const onSignUp = async(email,username,password)=>{
        try {
         const userRegister =  await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log("✔Đăng kí thành công", email,password)
            db
            .collection("users")
            .doc(userRegister.user.email)
            .set({
                owner_uid:userRegister.user.uid,
                username:username,
                email:userRegister.user.email,
                profile_picture:await getRandomProfilePic()
            })
        } catch (error) {
            console.log("EEE",error)
            Alert.alert(error.message)
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                validationSchema={SignUpFormSchema}
                onSubmit={(values) => onSignUp(values.email,values.username,values.password)}
                validateOnMount={true}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={[
                            styles.inputField,
                            {
                                borderColor: values.email.length < 1 || Validator.validate(values.email)
                                    ? "#ccc"
                                    : "red"
                            }
                        ]}>
                            <TextInput
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                placeholderTextColor={"#444"}
                                placeholder='Email'
                                autoCapitalize='none'
                                autoFocus={true}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                            />
                        </View>

                        <View style={[
                            styles.inputField,
                            {
                                borderColor: 1 > values.username.length || values.username.length >= 2
                                    ? "#ccc"
                                    : "red"
                            }
                        ]}>
                            <TextInput
                                value={values.username}
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                placeholderTextColor={"#444"}
                                placeholder='User name'
                                autoCapitalize='none'
                                textContentType='username'
                            />
                        </View>

                        <View style={[styles.inputField,
                        {
                            borderColor: 1 > values.password.length || values.password.length >= 6
                                ? "#ccc"
                                : "red"
                        }]}>
                            <TextInput
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                placeholderTextColor={"#444"}
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                            />
                        </View>

                        <View style={{ marginBottom: 30 }}>

                        </View>
                        <TouchableOpacity style={styles.btnHandle(isValid)} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.signUpContainer}>
                            <Text>Already have account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Login)}>
                                <Text style={{ color: "#6ba1f1" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default SignUpForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    inputField: {
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fafafa',
        marginBottom: 10,
        borderWidth: 1
    },
    btnHandle: isValid => ({
        backgroundColor: isValid ? "#0096f6" : "#9acaf7",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 4
    }),
    signUpContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 50
    }
})
