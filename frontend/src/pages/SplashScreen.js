import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {getUserInfo} from '../utils/functions';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    getUserInfo().then(info => {
      if (info?.access_token != null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    });
  };

  return <></>;
}

export default SplashScreen;
