import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDqVh0VwW7MaGBzrfWAJ-UbiWJFtN5QLT8",
authDomain: "chatapp-e3906.firebaseapp.com",
projectId: "chatapp-e3906",
storageBucket: "chatapp-e3906.appspot.com",
messagingSenderId: "425165476609",
appId: "1:425165476609:web:f9fe23dbf39aa3753fc100"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const db = getFirestore(app);

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={Start} />
          <Stack.Screen name='Chat'>
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default App;