import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '935804975652-ofv9lumnu4ru1a37srt3h30r53t7cbbp.apps.googleusercontent.com',
      offlineAccess: true,
    });
    getCurrentUserInfo();
  }, []);

  async function getCurrentUserInfo() {
    try {
      const _userInfo = await GoogleSignin.signInSilently();
      setUserInfo(_userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  }

  const [userInfo, setUserInfo] = useState();
  const [signInProgress, setSignInProgress] = useState(false);

  async function handleSignInWithGoogle() {
    setSignInProgress(true);
    try {
      await GoogleSignin.hasPlayServices();
      const _userInfo = await GoogleSignin.signIn();
      setUserInfo(_userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setSignInProgress(false);
    }
  }

  async function handleLogout() {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(userInfo);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>{userInfo?.user?.name}</Text>
      <GoogleSigninButton
        color={GoogleSigninButton.Color.Dark}
        onPress={handleSignInWithGoogle}
        disabled={signInProgress}
      />
      <Button title="Sign out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
