import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Username:' + username +' ' + 'Passoword:' + password);
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      console.log(formData);
      const response = await fetch('https://rentapisinav.ototur.com/api/v1/gettoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (response.ok) {
        const token = await response.json();
        console.log(token);
        console.log(response);
        navigation.navigate('HomeScreen', { token });
      } 
      else {
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
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View  style={styles.button}>
           <Button title="Login" onPress={handleLogin} />
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
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  button:{
    borderRadius:12,
    width:300,
    marginTop:10
  }
});

export default LoginScreen;