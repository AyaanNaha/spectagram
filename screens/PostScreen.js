import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';

export default class PostScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      light_theme: false,
      postLiked:false,
      likes: 0
    };
  }

  fetchUser = () => {
    let theme;
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" })
      })
  }

  fetchLikes = () => {
    firebase.database().ref("/posts/" + this.props.route.params.key + "/likes")
      .on("value", (snapshot) => {
        this.setState({ likes:snapshot.val()})
      })
  }

  likePost = () => {
    if(this.state.postLiked) {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.key)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
        this.setState({likes:this.state.likes-1, postLiked:false});
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.key)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
        this.setState({likes:this.state.likes+1, postLiked:true});
    }
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchLikes();
  }

  render() {
    let images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
      image_6: require("../assets/image_6.jpg"),
      image_7: require("../assets/image_7.jpg"),
    }
    return (
      <View style={this.state.light_theme ? styles.containerLight : styles.container}>
        <View style={styles.authorContainer}>
          <View style={styles.authorImageContainer}>
            <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
          </View>
          <View style={styles.authorNameContainer}>
            <Text style={this.state.light_theme ? styles.authorNameTextLight : styles.authorNameText}>{this.props.route.params.value.author}</Text>
          </View>
        </View>

        <Image source={images[this.props.route.params.value.preview_image]} style={styles.postImage}></Image>

        <View style={styles.captionContainer}>
          <Text style={this.state.light_theme ? styles.captionTextLight : styles.captionText}>{this.props.route.params.value.caption}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.likeButton} onPress={() => this.likePost()}>
            <Ionicons name={"heart"} size={RFValue(30)} color={"white"}></Ionicons>
            <Text style={styles.likeText}>{this.state.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  authorImageContainer: {
    flex: 0.2
  },
  profileImage: {
    width: RFValue(30),
    height: RFValue(30)
  },
  container: {
    flex: 1,
    backgroundColor: "#333",
    margin: RFValue(13),
    borderRadius: RFValue(20)
  },
  containerLight: {
    flex: 1,
    margin: RFValue(13),
    backgroundColor: "#dadada",
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
    justifyContent: "left",
    flexDirection: 'row',
    padding: 5
  },
  authorNameText: {
    fontSize: RFValue(18),
    flexDirection: "row",
    color: "white"
  },
  authorNameTextLight: {
    fontSize: RFValue(18),
    flexDirection: "row",
    color: "black"
  },
  captionText: {

    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
    paddingLeft: RFValue(10)
  },
  captionTextLight: {

    fontSize: 13,
    color: "black",
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