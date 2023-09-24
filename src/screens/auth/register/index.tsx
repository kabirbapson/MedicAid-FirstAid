import React from 'react';
import {
  Box,
  Text,
  VStack,
  Pressable,
  Icon,
  ScrollView,
  Input,
  Button,
  HStack,
  IconButton,
} from 'native-base';

import Feather from 'react-native-vector-icons/Feather';

// formik
import {Formik} from 'formik';
import {initialRegisterValue, signUpValidationSchema} from './utils';

import {responsiveHeight} from '../../../lib';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../../../store/actions/auth';
import {Alert} from 'react-native';

export const Register = ({navigation}) => {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();

  const {users} = useSelector(state => state.auth);
  console.log(users);

  const handleRegisterUser = data => {
    const phone = data.phoneNumber;
    const [firstName, lastName] = data.fullName.split(' ');

    delete data.phoneNumber;
    delete data.fullName;

    dispatch(signUp({...data, firstName, lastName, phone}, handleError));
  };

  const handleError = (message: string) => {
    Alert.alert('Register Error', message);
  };

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <VStack safeArea padding={'2'}>
        <HStack alignItems={'center'}>
          <IconButton
            onPress={() => navigation.goBack()}
            icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
          />
          <Text>Go Back</Text>
        </HStack>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={initialRegisterValue}
          onSubmit={values =>
            handleRegisterUser({
              ...values,
              username: values.username.trim().toLowerCase(),
              email: values.email.trim().toLowerCase(),
            })
          }>
          {({values, errors, handleChange, handleBlur, handleSubmit}) => (
            <Box
              flex={1}
              px={'6'}
              justifyContent="center"
              pt={responsiveHeight(30)}>
              <VStack space={4} mb={responsiveHeight(16)}>
                <Box>
                  <Text fontSize="xl" color="primary.600">
                    Register
                  </Text>
                </Box>
                <Input
                  size={'ls'}
                  rounded={'full'}
                  InputLeftElement={
                    <Icon
                      as={<Feather name="user" />}
                      size={5}
                      ml="4"
                      color="muted.400"
                    />
                  }
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  placeholder="Full Name"
                  autoCapitalize={'words'}
                />
                {errors.fullName && (
                  <Text color="red.400">{errors.fullName}</Text>
                )}
                <Input
                  size={'lg'}
                  rounded={'full'}
                  InputLeftElement={
                    <Icon
                      as={<Feather name="phone" />}
                      size={5}
                      ml="4"
                      color="muted.400"
                    />
                  }
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && (
                  <Text color="red.400">{errors.phoneNumber}</Text>
                )}
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
                  placeholder="Username"
                />
                {errors.username && (
                  <Text color="red.400">{errors.username}</Text>
                )}
                <Input
                  size={'lg'}
                  rounded={'full'}
                  InputLeftElement={
                    <Icon
                      as={<Feather name="mail" />}
                      size={5}
                      ml="4"
                      color="muted.400"
                    />
                  }
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Email Address"
                />
                {errors.email && <Text color="red.400">{errors.email}</Text>}

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
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  type={show ? 'text' : 'password'}
                />
                {errors.password && (
                  <Text color="red.400">{errors.password}</Text>
                )}
              </VStack>
              <Button rounded={'full'} onPress={handleSubmit}>
                Register
              </Button>
              <Pressable
                mt={responsiveHeight(10)}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  color="black"
                  textAlign={'center'}
                  fontSize={responsiveHeight(14)}
                  fontWeight={'medium'}>
                  Already have an Account?{' '}
                  <Text color="primary.400">Login.</Text>
                </Text>
              </Pressable>
            </Box>
          )}
        </Formik>
      </VStack>
    </ScrollView>
  );
};
