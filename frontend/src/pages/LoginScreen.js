import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import {styles} from '../styles/MainStyles';
import MyTextInput from '../components/MyTextInput';
import {onUserLogin, storeUserInfo} from '../utils/functions';
import axios from 'axios';
import {URL} from '../utils/ApiUtils';

function LoginScreen(props) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState();
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    // Simulated login successful
    try {
      console.log('loginHandler', parseInt(number), password, userName);
      let headersList = {
        Accept: '*/*',

        'Content-Type': 'application/json',
      };

      let bodyContent = JSON.stringify({
        number: parseInt(number),
        password: password,
        name: userName,
      });

      let reqOptions = {
        url: `${URL}/login`,
        method: 'POST',
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);

      if (response.data?.success) {
        const userID = response.data?.user?._id;
        const Name = response.data?.user?.name;
        const access_token = response.data?.access_token;

        console.log('userID yahoo', userID, 'Name', Name);
        // Store user info to auto login
        storeUserInfo({
          userID,
          Name,
          access_token,
        });

        // Init the call service
        onUserLogin(userID, Name, props).then(() => {
          // Jump to HomeScreen to make new call
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        });
      } else {
        alert('User Already Exists');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signupHandler = async () => {
    // Simulated login successful

    let headersList = {
      Accept: '*/*',

      'Content-Type': 'application/json',
    };

    let bodyContent = JSON.stringify({
      number: number,
      password: password,
      name: userName,
    });

    let reqOptions = {
      url: 'http://localhost:8080/registration/sign-up',
      method: 'POST',
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);

    if (response.data?.success) {
      const userID = response.data?.user?._id;
      const Name = response.data?.user?.name;
      const access_token = response.data?.access_token;
      // Store user info to auto login
      storeUserInfo({userID, Name, access_token});

      // Init the call service
      onUserLogin(userID, Name, props).then(() => {
        // Jump to HomeScreen to make new call
        navigation.navigate('HomeScreen', {userID});
      });
    } else {
      alert('User Already Exists');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginBottom: 30,
          }}>
          <MyTextInput
            label={'Enter your User name'}
            placeholder={'User name'}
            value={userName}
            onChangeText={setUserName}
            keyboardType={'numeric'}
          />
          <MyTextInput
            label={'Enter your Phone Number'}
            placeholder={'Phone Number'}
            value={number}
            onChangeText={setNumber}
            keyboardType={'numeric'}
          />

          <MyTextInput
            label={'Enter your Password'}
            placeholder={'Password'}
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <View style={{width: 160}}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              loginHandler();
            }}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{width: 160, marginTop: 20}}>
          {/* go to signupscreen button */}
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              signupHandler();
            }}>
            <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
