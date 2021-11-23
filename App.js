
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import StopWatch from './components/StopWatch';
import Homescreen from './components/Homescreen';

//create variable Stack for mai Navigation
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      {/* only one route*/}
      <Stack.Navigator initialRouteName="Home"    >

        {/* Home Component and its property */}
        <Stack.Group
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: 'papayawhip' },
            headerTitleStyle: { color: '#f3be4f' },
            presentation: 'modal',
            headerRight: () =>
              <TouchableOpacity title="StopWatch" onPress={() => navigation.navigate('StopWatch')}>
                <Image
                  style={styles.tinyLogo}
                  source={require('./assets/stopwatch.jpg')}
                />
              </TouchableOpacity>
          })}
        >
          <Stack.Screen name="Home" component={Homescreen} options={{ title: 'Today\'s tasks' }} />
        </Stack.Group>

        {/* Stopwatch Component  and its property*/}
        <Stack.Group
          screenOptions={{
            headerStyle: { backgroundColor: '#0D0D0D' },
            headerTitleStyle: { color: '#FFFFFF' },
            presentation: 'fullScreenModal',
            headerTintColor: '#FFFFFF'
          }}  >
          <Stack.Screen name="StopWatch" component={StopWatch} />
        </Stack.Group>


        {/*<Stack.Screen name="TerzaPagina" component={Homescreen} options={{ title: 'Terza pagina' }} />*/}
      </Stack.Navigator>

    </NavigationContainer>
  );
};



const styles = StyleSheet.create({  
  tinyLogo: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
});
