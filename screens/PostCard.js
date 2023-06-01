import * as React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostCard extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorImageContainer}>
                            <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
                        </View>
                        <View style={styles.authorNameContainer}>
                            <Text style={styles.authorNameText}>{this.props.post.author}</Text>
                        </View>
                    </View>

                    <Image source={require("../assets/post.jpeg")} style={styles.postImage}></Image>
                
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionText}>{this.props.post.caption}</Text>
                    </View>

                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name={"heart"} size={RFValue(30)} color={"white"}></Ionicons>
                            <Text style={styles.likeText}>12k</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    authorImageContainer:{
        flex:0.2
    },
    profileImage:{
        width:RFValue(30),
        height:RFValue(30)
    },
    container: {
      flex: 1
    },
    cardContainer: {
      margin: RFValue(13),
      backgroundColor: "#333",
      borderRadius: RFValue(20)
    },
    postImage: {
      resizeMode: "contain",
      width: "95%",
      alignSelf: "center",
      height: RFValue(250)
    },
    authorContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center"
    },
    authorNameText: {
      fontSize: RFValue(18),
      flexDirection:"row",
      color: "white"
    },
    captionText: {
     
      fontSize: 13,
      color: "white",
      paddingTop: RFValue(10),
      paddingLeft: RFValue(10)
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: RFValue(10)
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#eb3948",
      borderRadius: RFValue(30)
    },
    likeText: {
      color: "white",
      
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    }
  });