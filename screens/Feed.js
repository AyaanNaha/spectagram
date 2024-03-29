import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard';
import firebase from 'firebase';

let posts = require("../temp_posts.json");

export default class Feed extends React.Component {
    constructor() {
        super();
        this.state = {
            light_theme: false,
            posts: {}
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

    fetchPosts() {
        firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
                posts.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ posts: posts });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
    }

    componentDidMount() {
        this.fetchUser();
        this.fetchPosts();
        console.log(this.state.posts)
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation}></PostCard>
    }

    

    render() {
        return (
            <View style={this.state.light_theme ? 
                        styles.containerLight : styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={this.state.light_theme ? 
                                require("../assets/logoLight.png") :require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>

                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? 
                        styles.appTitleTextLight :styles.appTitleText}>Spectagram</Text>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.posts}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black'
    },
    containerLight:{
        flex:1,
        backgroundColor: 'white'
    },
    droidSafeArea:{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle:{
        flex:0.07,
        flexDirection:"row"
    },
    appIcon: {
        flex:0.2,
        justifyContent:"center",
        alignItems:"center"
    },
    iconImage:{
        width:"100%",
        height:"100%",
        resizeMode:"contain"
    },
    appTitleTextContainer:{
        flex:0.8,
        justifyContent:"center"
    },
    appTitleText:{
        color:"white",
        fontSize: RFValue(28)
    },
    appTitleTextLight:{
        color:"black",
        fontSize: RFValue(28)
    },
    cardContainer:{
        flex:0.95,
        marginTop:5
    }
})