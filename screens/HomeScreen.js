import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text,StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

const SearchScreen = () => {
  const [locations, setLocations] = useState([]);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const fetchLocations = async () => {
    try {
      const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlicyIsImV4cCI6MTcwMTMzMjIxNn0.YoZKcESabwWI7lyXeWrn-HwC81PvRHDcUNCUoIliIGs';
      const response = await fetch('https://rentapi.ototur.com/api/v1/locations/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const data = await response.json();
      setLocations(data.result.content);
      setFromLocation(data.result.content[0]);
      setToLocation(data.result.content[0]);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '80%' }}>
        <Text style={styles.label}>From</Text>
        <DropDownPicker
          items={locations.map(location => ({ label: location.name, value: location }))}
          defaultValue={fromLocation}
          containerStyle={{ height: 40, marginBottom: 20 }}
          onChangeItem={item => setFromLocation(item.value)}
          style={{ borderColor: '#000', backgroundColor: '#fff' }}
        />
        <Text style={styles.label}>To</Text>
        <DropDownPicker
          items={locations.map(location => ({ label: location.name, value: location }))}
          defaultValue={toLocation}
          containerStyle={{ height: 40, marginBottom: 20 }}
          onChangeItem={item => setToLocation(item.value)}
          style={{ borderColor: '#000', backgroundColor: '#fff' }}
        />
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:6
  },
  button:{
    borderRadius:12,
    width:300,
    marginTop:10
  }
  
})
export default SearchScreen;