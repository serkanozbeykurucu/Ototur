// LoginScreen.js
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Username:' + username +' ' + 'Passoword:' + password);
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
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
    <View>
      <Text>Username:</Text>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        // secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;