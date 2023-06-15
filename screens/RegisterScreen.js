import * as React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    Text,
  } from 'react-native';
// import firebase from 'firebase';

export default class RegisterScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmedPassword:""
        }
    }

    // registerUser = (email, password, confirmedPassword, firstName, lastName) => {
    //     if (password == confirmedPassword) {
    //       firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((userCredential) => {
    //           alert('User Registered');
    //           console.log(userCredential.user.uid);
    //           this.props.navigation.replace('Login');
    //           firebase.database()
    //             .ref('/users/' + userCredential.user.uid)
    //             .set({
    //               email: userCredential.user.email,
    //               firstName: firstName,
    //               lastName: lastName,
    //               currentTheme: 'dark',
    //             })
    //             .catch((error) => {
    //               alert(error.message);
    //             });
    //         });
    //     } else {
    //       alert("Password does not match")
    //     }
    //   };

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.appTitleText}>Register</Text>

            {/* Add code to create two more text inputs for first name and last name */}
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ firstName: text })}
              placeholder={'Enter Your First Name'}
              placeholderTextColor={'#FFFFFF'}
            />
  
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ lastName: text })}
              placeholder={'Enter Your Last Name'}
              placeholderTextColor={'#FFFFFF'}
            />
  
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder={'Enter Email'}
              placeholderTextColor={'#FFFFFF'}
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder={'Enter Password'}
              placeholderTextColor={'#FFFFFF'}
              secureTextEntry
            />
  
            {/* Add code to create one more text input to confirm the password */}
  
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ confirmedPassword: text })}
              placeholder={'Confirm Password'}
              placeholderTextColor={'#FFFFFF'}
              secureTextEntry
            />
  
            <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={()=> this.registerUser(this.state.email, this.state.password, this.state.confirmedPassword, this.state.firstName, this.state.lastName)}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15193c',
      alignItems: 'center',
    },
    appIcon: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    appTitleText: {
      color: 'white',
      textAlign: 'center',
      fontSize:40,
      marginBottom:20,
      marginTop:100
    },
    textinput: {
      width:250,
      height:40,
      padding:10,
      marginTop:10,
      borderColor: '#FFFFFF',
      borderWidth:4,
      borderRadius:10,
      fontSize:15,
      color: '#FFFFFF',
      backgroundColor: '#15193c',
    },
    button: {
      width:250,
      height:50,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: 'white',
      marginBottom:20,
    },
    buttonText: {
      fontSize:24,
      color: '#15193c',
    },
    buttonTextNewUser: {
      fontSize:12,
      color: '#FFFFFF',
      textDecorationLine: 'underline',
    },
  });