import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../../navigation/Route'
import {firebase,db} from '../../../../api/firebase/config'

const LoginForm = () => {

    const navigation = useNavigation()
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        password: Yup.string().min(6, "Your password has to have at least 8 characters")
    })

    const onLogin =  async(email,password)=>{
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("💕Firebase login success",email,password)
        } catch (error) {
            Alert.alert("Thông báo", "Tài khoản và mật khẩu không đúng!!! \n\nBạn chưa có tài khoản? Đăng ký ngay",[
                {
                    text:"Xác nhận",
                    onPress:()=>console.log("Ok"),
                    style:"cancel"
                },{
                    text:"Đăng ký",
                    onPress:()=>navigation.navigate(ROUTES.SignUp)
                }
            ])
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginFormSchema}
                onSubmit={(values) => onLogin(values.email,values.password)}
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
                                placeholder='Phone number, username or email'
                                autoCapitalize='none'
                                autoFocus={true}
                                keyboardType='email-address'
                                textContentType='emailAddress'
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

                        <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
                            <Text style={{ color: "#6ba1f1" }}>Forgot Password? </Text>
                        </View>
                        <TouchableOpacity style={styles.btnHandle(isValid)} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.signUpContainer}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SignUp)}>
                                <Text style={{ color: "#6ba1f1" }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default LoginForm

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
