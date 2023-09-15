import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {styles} from '../styles/MainStyles';

function HomeScreen(props) {
  const [userID, setUserID] = useState('');
  const [invitees, setInvitees] = useState([
    {
      userID: 'user1',
      userName: 'user1',
    },
    {
      userID: 'user2',
      userName: 'user2',
    },
  ]);
  const viewRef = useRef(null);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Your user id: {userID}</Text>

      <FlatList
        style={{
          width: '100%',
        }}
        data={invitees}
        renderItem={({item}) => {
          return (
            <View style={styles.userCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 10,
                  }}
                />

                <Text>656757 Ray </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <ZegoSendCallInvitationButton
                  invitees={invitees.map(inviteeID => {
                    return {userID: inviteeID, userName: 'user_' + inviteeID};
                  })}
                  isVideoCall={false}
                />
                <View
                  style={{
                    width: 10,
                  }}
                />
                <ZegoSendCallInvitationButton
                  invitees={invitees.map(inviteeID => {
                    return {userID: inviteeID, userName: 'user_' + inviteeID};
                  })}
                  isVideoCall={true}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => item}
      />
      {/* <View style={{width: 220, marginTop: 100}}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              props.navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.btnText}>Back To Login Screen</Text>
          </TouchableOpacity>
        </View> */}
    </View>
  );
}

export default HomeScreen;
