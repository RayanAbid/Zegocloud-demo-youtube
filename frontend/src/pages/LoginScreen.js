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
import KeyCenter from '../../KeyCenter';
import {getFirstInstallTime} from 'react-native-device-info';

import * as ZIM from 'zego-zim-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {styles} from '../styles/MainStyles';
import MyTextInput from '../components/MyTextInput';

function LoginScreen(props) {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    // Simulated login successful

    // Store user info to auto login
    storeUserInfo({userID, userName});

    // Init the call service
    onUserLogin(userID, userName, props).then(() => {
      // Jump to HomeScreen to make new call
      navigation.navigate('HomeScreen', {userID});
    });
  };

  const storeUserInfo = async info => {
    await AsyncStorage.setItem('userID', info.userID);
    await AsyncStorage.setItem('userName', info.userName);
  };

  const onUserLogin = async (userID, userName, props) => {
    return ZegoUIKitPrebuiltCallService.init(
      KeyCenter.appID,
      KeyCenter.appSign,
      userID,
      userName,
      [ZIM],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        requireConfig: data => {
          return {
            durationConfig: {
              isVisible: true,
              onDurationUpdate: duration => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              props.navigation.navigate('HomeScreen');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              props.navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };

  useEffect(() => {
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(firstInstallTime).slice(-5);
      setUserID(id);
      const name = 'user_' + id;
      setUserName(name);
    });
  }, []);

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
          {/* <Text style={styles.text}>appID: {KeyCenter.appID}</Text>
        <Text style={styles.text}>userID: {userID}</Text>
        <Text style={styles.text}>userName: {userName}</Text> */}

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
      </View>
    </View>
  );
}

export default LoginScreen;
