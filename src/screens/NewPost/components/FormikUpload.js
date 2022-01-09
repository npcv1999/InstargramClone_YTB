import React, { useState } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ValidUrl from 'valid-url'

const PLACEHOLDER_IMG = "http://timtaxi.vn/wp-content/uploads/2019/01/ef3-placeholder-image.jpg"


const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the character").required("Caption is required")
})


const FormikUpload = () => {
    const navigation = useNavigation()
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    return (

        <Formik
            initialValues={{ caption: "", imageUrl: "" }}
            onSubmit={(values) => { console.log(values), navigation.goBack() }}
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
