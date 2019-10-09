import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, AsyncStorage, StyleSheet, Image, StatusBar, Platform, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import logo from '../assets/logo.png';
import SpotList from '../components/Spotlist';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('user_id');
    await AsyncStorage.removeItem('techs');
    console.log('logout function');
    //setTechs('');

    navigation.navigate('Login');
  }

  return (

    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }} >
      <View style={styles.header}>
        <Icon
          name="tune"
          raised={false}
          size={30}
          color="#3C3B3F"
          onPress={handleLogout}
        />
        <Image style={styles.logo} source={logo} />
        <Icon
          name="exit-to-app"
          raised={false}
          size={30}
          color="#3C3B3F"
          style={styles.logout}
          onPress={handleLogout}
        />
      </View>


      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  logo: {
    height: 35,
    resizeMode: "contain",
    alignSelf: 'center',
  },
  logout: {
    alignSelf: 'flex-end',
  }
});