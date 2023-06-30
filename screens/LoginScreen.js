import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  h=()=> {}

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace('Dashboard');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}></Image>
        <Text style={styles.titleText}>Spectagram</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="Enter Email"
          placeholderTextColor={'#FFFFFF'}
          autoFocus></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Enter Password"
          placeholderTextColor={'#FFFFFF'}
          secureTextEntry></TextInput>

        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.signIn(this.state.email, this.state.password);
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  textInput: {
    width: 250,
    height: 50,
    padding: 10,
    borderColor: '#FFF',
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#AEAEAE',
    marginTop: 20,
    alignSelf: 'center',
  },
  logo: {
    marginTop: 50,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 50,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#0099FF',
    width: 150,
    height: 50,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
