import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

import api from '../services/api';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { tech }
      })
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
            <View style={styles.rowTextIcon}>

              <Button
                icon={
                  <Icon
                    name="link"
                    size={30}
                    color="black"
                    iconStyle={{ marginRight: 7 }}
                  />
                }
                type="clear"
                title={item.company}
                titleStyle={styles.company}
                onPress={() => { Linking.openURL(item.site) }}
              />
            </View>

            <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold'
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 5,
    marginRight: 15
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  company: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  siteIcon: {
    resizeMode: 'cover',

  },
  rowTextIcon: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default withNavigation(SpotList);