import * as React from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            isEnabled: false,
            light_theme: false,
            profile_image: "",
            name: ""
        }
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        let theme, name;

        firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme;
                name = `${snapshot.val().first_name} ${snapshot.val().last_name}`
            });

        this.setState({
            light_theme: theme === "light" ? true : false,
            isEnabled: theme === "light" ? false : true,
            name: name,
        });
    }

    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? "dark" : "light";
        var updates = {};
        updates[
          "/users/" + firebase.auth().currentUser.uid + "/current_theme"
        ] = theme;
        firebase
          .database()
          .ref()
          .update(updates);
        this.setState({ isEnabled: !previous_state, light_theme: previous_state });
      }

    render() {
        return (
            <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={this.state.light_theme ? require("../assets/logoLight.png") :
                        require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>

                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText}>Spectagram</Text>
                    </View>
                </View>
                

                <Text
                style={
                  this.state.light_theme
                    ? styles.nameTextLight
                    : styles.nameText
                }
              >
                {this.state.name}
              </Text>

                <View style={styles.themeContainer}>

                    <Text
                        style={
                            this.state.light_theme
                                ? styles.themeTextLight
                                : styles.themeText
                        }
                    >
                        Dark Theme
                    </Text>
                    <Switch
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        trackColor={{
                            false: "#767577",
                            true: this.state.light_theme ? "#eee" : "white"
                        }}
                        thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => this.toggleSwitch()}
                        value={this.state.isEnabled}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
      },
      containerLight: {
        flex: 1,
        backgroundColor: "white"
      },
    nameText: {
        color: "white",
        fontSize: RFValue(40),
        marginTop: RFValue(200),
        textAlign: "center"
      },
      nameTextLight: {
        color: "black",
        fontSize: RFValue(40),
        marginTop: RFValue(200),
        textAlign: "center"
      },
    themeContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: RFValue(20)
    }, themeText: {
        color: "white",
        fontSize: RFValue(30),
        marginRight: RFValue(15)
    },
    themeTextLight: {
        color: "black",
        fontSize: RFValue(30),
        marginRight: RFValue(15)
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.1,
        flexDirection: "row",
        marginTop: 20
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28)
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28)
    }
})