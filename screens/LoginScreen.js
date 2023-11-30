import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet ,Image} from 'react-native';

const logoImage = require('../assets/logoototur.png');
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (username, password) => {
    try {
      console.log('Username:' + username + ' ' + 'Password:' + password);
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };
      const response = await fetch('https://rentapisinav.ototur.com/api/v1/gettoken', requestOptions);
      if (response.ok) {
        const token = await response.json();
        console.log(token);
        alert(token);
        navigation.navigate('HomeScreen', { token });
      } else {
        console.error('Login failed', response.status);
        Alert.alert('Login failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      Alert.alert('Login failed', 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logoImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.button}>
        <Button title="Login" onPress={() => handleLogin(username, password)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    marginRight:215
    },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    borderRadius: 12,
    width: 300,
    marginTop: 10,
  },
  image: {
    width: '80%',
  }
});

export default LoginScreen;