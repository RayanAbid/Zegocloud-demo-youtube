import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {styles} from '../styles/MainStyles';

function HomeScreen(props) {
  const [userID, setUserID] = useState('');
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);
  const blankPressedHandle = () => {
    viewRef.current.blur();
  };
  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };

  useEffect(() => {
    // Simulated auto login if there is login info cache
    getUserInfo().then(info => {
      if (info) {
        setUserID(info.userID);
        onUserLogin(info.userID, info.userName, props);
      } else {
        // Back to the login screen if not login before
        props.navigation.navigate('LoginScreen');
      }
    });
  }, []);

  const getUserInfo = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID');
      const userName = await AsyncStorage.getItem('userName');
      if (userID == undefined) {
        return undefined;
      } else {
        return {userID, userName};
      }
    } catch (e) {
      return undefined;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your user id: {userID}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={viewRef}
            style={styles.input}
            onChangeText={changeTextHandle}
            placeholder="Invitees ID, Separate ids by ','"
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={false}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={true}
          />
        </View>
        <View style={{width: 220, marginTop: 100}}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              props.navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.btnText}>Back To Login Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;
