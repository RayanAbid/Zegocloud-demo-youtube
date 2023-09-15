import * as ZIM from 'zego-zim-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from '../../KeyCenter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const onUserLogin = async (userID, userName, props) => {
  return ZegoUIKitPrebuiltCallService.init(
    KeyCenter.appID,
    KeyCenter.appSign,
    userID,
    userName,
    [ZIM],
    {
      ringtoneConfig: {
        // incomingCallFileName: 'zego_incoming.mp3',
        // outgoingCallFileName: 'zego_outgoing.mp3',
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

export const storeUserInfo = async info => {
  console.log('testssjhkesd', info);
  await AsyncStorage.setItem('userID', info.userID);
  await AsyncStorage.setItem('userName', info.Name);
  await AsyncStorage.setItem('access_token', info.access_token);
};

export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export const getUserInfo = async () => {
  try {
    const userID = await AsyncStorage.getItem('userID');
    const userName = await AsyncStorage.getItem('userName');
    const access_token = await AsyncStorage.getItem('access_token');
    if (userID == undefined) {
      return undefined;
    } else {
      return {userID, userName, access_token};
    }
  } catch (e) {
    return undefined;
  }
};
