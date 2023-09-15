import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';

import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {styles} from '../styles/MainStyles';
import {clearAsyncStorage, getUserInfo, onUserLogin} from '../utils/functions';
import axios from 'axios';
import {URL} from '../utils/ApiUtils';

function HomeScreen(props) {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [invitees, setInvitees] = useState([]);

  useEffect(() => {
    // Simulated auto login if there is login info cache
    getUserInfo().then(info => {
      if (info) {
        setUserID(info.userID);
        console.log('testing info', info);
        callGetAllUsers(info.access_token);
        setUserName(info.userName);
        onUserLogin(info.userID, info.userName, props);
      } else {
        // Back to the login screen if not login before
        props.navigation.navigate('LoginScreen');
      }
    });
  }, []);

  const callGetAllUsers = async accessToken => {
    console.log('testing accessToken', accessToken);
    let headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`,
    };

    let reqOptions = {
      url: `${URL}/get-users`,
      method: 'GET',
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    console.log('testData', response.data);
    setInvitees(response.data?.users);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your user name: {userName}</Text>

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

                <Text>
                  {item?.name} - {item?.number}{' '}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <ZegoSendCallInvitationButton
                  invitees={invitees.map(inviteeID => {
                    return {userID: item?._id, userName: 'user_' + item?._id};
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
                    return {userID: item?._id, userName: 'user_' + item?._id};
                  })}
                  isVideoCall={true}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => item}
      />
      <View style={{width: 220, flex: 1}}>
        <TouchableOpacity
          style={[
            styles.btnContainer,
            {
              backgroundColor: 'red',
            },
          ]}
          onPress={() => {
            clearAsyncStorage();
            props.navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }}>
          <Text style={[styles.btnText, {}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
