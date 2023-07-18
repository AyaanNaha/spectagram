import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      previewImage: "image_1",
      caption: '',
      dropdownHeight: 40,
      light_theme: false
    }
  }

  async addPost() {
    if(this.state.caption) {
      let postData = {
        preview_image: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes:0
      };

      await firebase.database().ref("/posts/" + Math.random().toString(36).slice(2))
        .set(postData).then(function (snapshot) {});
        this.props.setUpdateToTrue();
        this.props.navigation.navigate("Feed");
    } else {
      alert(
        "All fields are required!",
        [{text: "OK", onPress: () => console.log("Ok Pressed")}],
        {cancelable: false}
      )
    }
  }


  fetchUser = () => {
    let theme;
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" })
      })
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    let preview_images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
      image_6: require("../assets/image_6.jpg"),
      image_7: require("../assets/image_7.jpg"),
    }

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        style={this.state.light_theme ? styles.containerLight : styles.container}>

        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.iconImage}></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>New Post</Text>
          </View>
        </View>

        <ScrollView >
          <Image
            source={preview_images[this.state.previewImage]}
            style={styles.previewImage}></Image>

          <View style={{ height: RFValue(this.state.dropdownHeight) }}>
            <DropDownPicker
              items={[
                { label: 'Image 1', value: 'image_1' },
                { label: 'Image 2', value: 'image_2' },
                { label: 'Image 3', value: 'image_3' },
                { label: 'Image 4', value: 'image_4' },
                { label: 'Image 5', value: 'image_5' },
                { label: 'Image 6', value: 'image_6' },
                { label: 'Image 7', value: 'image_7' },
              ]}
              defaultValue={this.state.previewImage}
              open={this.state.dropdownHeight == 170 ? true : false}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={this.state.light_theme ? {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'black',
              } : {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'white',
              }}
              textStyle={this.state.light_theme ? {
                color: 'black',
              } : {
                color: this.state.dropdownHeight == 170 ? 'black' : 'white',
              }}
              onSelectItem={(item) => {
                this.setState({
                  previewImage: item.value,
                });
              }}
            />
          </View>

          <TextInput
            style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
            onChangeText={(caption) => {
              this.setState({ caption });
            }}
            placeholder={'Caption'}
            placeholderTextColor={this.state.light_theme ? "black" : "white"}
          />

          <TouchableOpacity
           style={[styles.button, { marginTop: 20 }]}
           onPress={() => {this.addPost()}}
          >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        </ScrollView>


      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    marginTop: RFValue(20)
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    marginTop: RFValue(20)
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
    marginTop: RFValue(40)
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),

  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),

  },
  appTitle: {
    flex: 0.7,
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: "50%",
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft:"25%"
  },
  buttonText: {
    fontSize: 24,
    color: '#15193c',
  },
});
