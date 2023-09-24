/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard} from './BottomNavigation';
import {Login, Register} from '../screens/auth';
import {
  Airticles,
  FirstAidScreen,
  VideoScreen,
  WelcomeScreen,
} from '../screens';
import {SplashScreen} from '../screens/splash';
import {MoreOptions} from '../screens/moreOptions';
import {useDispatch, useSelector} from 'react-redux';
import {restoreUser} from '../store/actions/auth';
import {useEffect} from 'react';
import { FindGuides } from '../screens/findguides';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleRestoreUserSession = () => {
    dispatch(restoreUser());
  };

  useEffect(() => {
    handleRestoreUserSession();
  }, []);

  const renderAuthScreens = () => (
    <>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Register" component={Register} />
    </>
  );

  const renderAppScreens = () => (
    <>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Videos" component={VideoScreen} />
      <Stack.Screen name="FirstAid" component={FirstAidScreen} />
      <Stack.Screen name="Articles" component={Airticles} />
      <Stack.Screen name="MoreOptions" component={MoreOptions} />
      <Stack.Screen name="FindGuides" component={FindGuides} />

    </>
  );

  if (auth.isRestoringUser) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {auth.isAuthenticated === false
          ? renderAuthScreens()
          : renderAppScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
