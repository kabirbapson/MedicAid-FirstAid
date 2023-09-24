import React, {useCallback, useEffect, useState} from 'react';
import {
  VStack,
  Text,
  Button,
  Box,
  HStack,
  Image,
  Avatar,
  ScrollView,
  Pressable,
  IconButton,
  Divider,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

export const WelcomeScreen = ({navigation}: {navigation: any}) => {
  const navigateTo = (route: string) => {
    navigation.navigate(route);
  };
  return (
    <VStack flex={1} bgColor={'primary.100'} justifyContent={'flex-end'}>
      <Image
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        alt={'web'}
        source={{
          uri: 'https://images.unsplash.com/photo-1591562747474-ab6e2dab1070?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80',
        }}
      />

      <VStack
        h={'20%'}
        bgColor={'rgba(0,0,0,0.8)'}
        p={'6'}
        space={'3'}
        borderTopRadius={'20px'}>
        <Button
          onPress={() => navigateTo('Register')}
          size={'lg'}
          rounded={'full'}>
          Get Started
        </Button>
        <Button
          onPress={() => navigateTo('Login')}
          rounded={'full'}
          size={'lg'}
          variant={'outline'}>
          Login Account
        </Button>
      </VStack>
    </VStack>
  );
};
