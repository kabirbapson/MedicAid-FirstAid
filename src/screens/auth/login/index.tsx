import React from 'react';
import {
  Box,
  Text,
  VStack,
  Pressable,
  Icon,
  Input,
  Button,
  HStack,
  IconButton,
} from 'native-base';

import Feather from 'react-native-vector-icons/Feather';

import {Formik} from 'formik';
import {loginValidationSchema, initialLoginValue} from './utils';
import {responsiveHeight} from '../../../lib';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../../store/actions/auth';
import {Alert} from 'react-native';

export const Login = ({navigation}) => {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();

  const {isLoading} = useSelector(state => state.auth);

  const handleLoginUser = (data: {[key: string]: any}) => {
    dispatch(signIn(data, handleError));
  };

  const handleError = (message: string) => {
    Alert.alert('Login Error', message);
  };

  return (
    <VStack flex={1} safeArea>
      <HStack alignItems={'center'}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
        />
        <Text>Go Back</Text>
      </HStack>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialLoginValue}
        onSubmit={values =>
          handleLoginUser({
            ...values,
            username: values.username.trim().toLowerCase(),
          })
        }>
        {({errors, values, handleBlur, handleChange, handleSubmit}) => (
          <Box flex={1} px={'6'} justifyContent="center">
            <VStack space={4}>
              <Box>
                <Text color="primary.600" fontSize="xl">
                  Login
                </Text>
              </Box>
              <Input
                size={'lg'}
                rounded={'full'}
                InputLeftElement={
                  <Icon
                    as={<Feather name="user" />}
                    size={5}
                    ml="4"
                    color="muted.400"
                  />
                }
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder="Username"
              />
              {errors.username && (
                <Text color={'red.400'}>{errors.username}</Text>
              )}
              <Input
                size={'lg'}
                rounded={'full'}
                InputLeftElement={
                  <Icon
                    as={<Feather name="lock" />}
                    size={5}
                    ml="4"
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={<Feather name={show ? 'eye' : 'eye-off'} />}
                      size={5}
                      mr="4"
                      color="muted.400"
                    />
                  </Pressable>
                }
                type={show ? 'text' : 'password'}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Password"
              />
              {errors.password && (
                <Text color={'red.400'}>{errors.password}</Text>
              )}
              <Pressable
                mb={responsiveHeight(10)}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text color="primary.400" textAlign={'right'}>
                  Forgot Password?
                </Text>
              </Pressable>
            </VStack>
            <Button onPress={handleSubmit}>Login</Button>
            <Pressable
              mt={responsiveHeight(10)}
              onPress={() => navigation.navigate('Register')}>
              <Text
                color="black"
                textAlign={'center'}
                fontSize={responsiveHeight(14)}
                fontWeight={'medium'}>
                Don't have an Account?{' '}
                <Text color="primary.400">Register.</Text>
              </Text>
            </Pressable>
          </Box>
        )}
      </Formik>
    </VStack>
  );
};
