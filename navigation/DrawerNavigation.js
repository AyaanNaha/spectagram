import React, {Component} from "react";
import { createDrawerNavigator, getDrawerStatusFromState } from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";
import Logout from "../screens/Logout";
import CustomSidebarMenu from "../screens/CustomSidebarMenu";
import firebase from "firebase";
import { SlideOutDown } from "react-native-reanimated";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      updated: false
    };
  }

  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false, updated: true });
    
  }

  render() {
    let props = this.props;

    let oppositeThemeColor = this.state.light_theme ? "black" : "white";
    let lightTheme = this.state.light_theme


    return (
      <Drawer.Navigator
        drawerContent={props => <CustomSidebarMenu {...props} />}
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          inactiveTintColor: oppositeThemeColor,
          itemStyle: { marginVertical: 5 }
        }}
        screenOptions={{
          unmountOnBlur: true,
          drawerLabelStyle: {color:oppositeThemeColor},
          drawerActiveBackgroundColor: lightTheme ? "e9e9e9" : "232323"
        }}>
        <Drawer.Screen
          name="Home"
          component={StackNavigator}></Drawer.Screen>
        <Drawer.Screen 
          name="Profile" 
          component={Profile} ></Drawer.Screen>
        <Drawer.Screen 
          name="Logout"
          component={Logout}></Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}