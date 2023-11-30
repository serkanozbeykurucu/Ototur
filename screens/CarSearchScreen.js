import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const CarSearchScreen = () => {
  const [availableVehicles, setAvailableVehicles] = useState([]);
  useEffect(() => {
    const fetchAvailableVehicles = async () => {
      const bearerToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlicyIsImV4cCI6MTcwMTMzMjIxNn0.YoZKcESabwWI7lyXeWrn-HwC81PvRHDcUNCUoIliIGs';
      const response = await fetch('https://rentapi.ototur.com/api/v1/vehicle/avaliable', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const vehicles = result.result.content;
        setAvailableVehicles(vehicles);
      } else {
        console.error('Error fetching available vehicles');
      }
    };
    fetchAvailableVehicles();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Text>Name: {item.name}</Text>
      <Text>Brand: {item.marka}</Text>
      <Text>Model: {item.model}</Text>
      <Text>Fuel: {item.fuel}</Text>
      <Text>Transmission: {item.transmission}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Available Vehicles</Text>
      <FlatList
        data={availableVehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.aracid}
      />
    </View>
  );
};

export default CarSearchScreen;
