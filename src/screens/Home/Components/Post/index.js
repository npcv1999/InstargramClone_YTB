import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { db,firebase } from '../../../../api/firebase/config'
import { Images } from '../../../../utils/images'

const posterFooterIcons = [
    {
        name: "Like",
        imageUrl: Images.heart,
        likedImageUrl: Images.hearted
    },
    {
        name: "Comment",
        imageUrl: Images.comment,
    },
    {
        name: "Share",
        imageUrl: Images.send,
    },
    {
        name: "Save",
        imageUrl: Images.save,
    }
]

const PostHeader = ({ post }) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                <Image source={{ uri: post?.profile_picture }} style={styles.profileImg}></Image>
                <Text style={{ color: "white", marginLeft: 5 }}>{post?.user}</Text>
            </View>
            <TouchableOpacity>
                <Image source={Images.option} style={{ tintColor: "white", width: 15, height: 15 }}></Image>
            </TouchableOpacity>
        </View>
    )
}

const PostImg = ({ post }) => {
    return (
        <View style={{ width: "100%", height: 450 }}>
            <Image source={{ uri: post.imageUrl }} style={{ height: "100%", resizeMode: "cover" }}>
            </Image>
        </View>
    )
}

const PostFooter = ({post,handleLike}) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={styles.leftFooterIcon}>
                <Icons 
                onPress={()=>handleLike(post)} 
                imgStyle={styles.footerIcon} 
                imgUrl={post.likes_by_user.includes(firebase.auth().currentUser.email) 
                ? posterFooterIcons[0].likedImageUrl 
                : posterFooterIcons[0].imageUrl}></Icons>
                <Icons imgStyle={styles.footerIcon} imgUrl={posterFooterIcons[1].imageUrl}></Icons>
                <Icons imgStyle={styles.footerIcon} imgUrl={posterFooterIcons[2].imageUrl}></Icons>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }} >
                <Icons imgStyle={styles.footerIcon} imgUrl={posterFooterIcons[3].imageUrl}></Icons>
            </View>
        </View>
    )
}
const Icons = ({ imgStyle, imgUrl ,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <Image style={imgStyle} source={imgUrl}></Image>
        </TouchableOpacity>
    )
}

const Likes = ({ post }) => (
    <Text style={{ color: "white", marginTop: 6 }}>
        {post.likes_by_user.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} lượt thích
    </Text>
)

const Caption = ({ post }) => {
    return (
        <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>{post.user} </Text>
            <Text style={{ color: "white" }}>{post.caption}</Text>
        </View>
    )
}

const CommentSection = ({ post }) => {
    return (
        <View>
            {!!post.comments.length && <Text style={{ color: "gray" }}>Xem{post.comments.length > 1 ? " tất cả" : ""} {post.comments.length} bình luận</Text>}
        </View>
    )
}

const Comments = ({ post }) => {
    return (
        <>
            {
                post.comments.map((comment, index) => (
                    <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={{ color: "white" }}>
                            <Text style={{ fontWeight: "bold" }}>{comment.user} </Text>
                            {comment.comment}
                        </Text>
                    </View>
                ))
            }
        </>

    )
}

const Post = ({ post }) => {

    const handleLike = (item) =>{
        console.log("Item",item)
        const currentLikedStatus = !item.likes_by_user.includes(
            firebase.auth().currentUser.email
        )
        db.collection("users").doc(item.owner_email).collection("posts").doc(item.id).update({
            likes_by_user:currentLikedStatus 
            ? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email) 
            : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email) 
        }).then(()=>console.log("THÀNH CÔNG")).catch((err)=>console.log("Lỗi",err))
    }

    return (
        <View style={{ marginVertical: 15 }}>
            <Divider width={1} orientation='vertical'></Divider>
            <PostHeader post={post}></PostHeader>
            <PostImg post={post}></PostImg>
            <View style={{ margin: 10, marginTop: 20 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    profileImg: {
        width: 35,
        height: 35,
        borderRadius: 17,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: "#ff8501"
    },
    footerIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        tintColor: "white",
    },
    leftFooterIcon: {
        flexDirection: "row",
        width: "32%",
        justifyContent: "space-between"
    }
})
