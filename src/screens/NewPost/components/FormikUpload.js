import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ValidUrl from 'valid-url'
import { db, firebase } from '../../../api/firebase/config';

const PLACEHOLDER_IMG = "http://timtaxi.vn/wp-content/uploads/2019/01/ef3-placeholder-image.jpg"


const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the character").required("Caption is required")
})


const FormikUpload = () => {
    const navigation = useNavigation()
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLogged, setCurrentLogged] = useState(null)

    const getUserName = () => {
        const user = firebase.auth().currentUser
        console.log("USER",user)
        const unsubscribe = db
            .collection("users")
            .where("owner_uid", "==", user.uid)
            .limit(1)
            .onSnapshot(snapshot => snapshot.docs.map(doc => {
                setCurrentLogged({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            }))
        return unsubscribe
    }

    useEffect(() => {
        getUserName()
    }, []);

    const uploadToFirebase = (imageUrl, caption) => {
        const unsubscribe = db
            .collection("users")
            .doc(firebase.auth().currentUser.email)
            .collection("posts")
            .add({
                imageUrl: imageUrl,
                user: currentLogged.username,
                owner_id:firebase.auth().currentUser.uid,
                owner_email:firebase.auth().currentUser.email,
                profile_picture: currentLogged.profilePicture ,
                caption: caption,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_user:[],
                comments: [],
            }).then(()=> navigation.goBack())
        return unsubscribe
    }

    return (
        <Formik
            initialValues={{ caption: "", imageUrl: "" }}
            onSubmit={(values) => uploadToFirebase(values.imageUrl,values.caption)}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={styles.containerForm}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: ValidUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
                        />

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput
                                style={{ color: "#fff", fontSize: 20 }}
                                value={values.caption}
                                onChangeText={handleChange("caption")}
                                onBlur={handleBlur("caption")}
                                placeholder="Write a caption ..."
                                placeholderTextColor="gray"
                                multiline={true}
                            />
                        </View>
                    </View>

                    <Divider width={0.2} orientation='vertical' />
                    <TextInput
                        style={{ color: "#fff", fontSize: 16 }}
                        value={values.imageUrl}
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        onChangeText={handleChange("imageUrl")}
                        onBlur={handleBlur("imageUrl")}
                        placeholder="Enter a Image Url"
                        placeholderTextColor="gray"
                    />
                    {errors.imageUrl &&
                        (<Text style={{ color: "red", fontSize: 14 }}>
                            {errors.imageUrl}
                        </Text>
                        )}
                    <Button title='Share' onPress={handleSubmit} disabled={!isValid}></Button>
                </>
            )}
        </Formik>
    )
}

export default FormikUpload

const styles = StyleSheet.create({
    containerForm: {
        margin: 20,
        justifyContent: "space-between",
        flexDirection: "row",
    }
})
