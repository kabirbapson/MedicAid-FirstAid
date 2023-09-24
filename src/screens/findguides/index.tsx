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
  CardItem,
  Divider,
  Card,
  Body,
  View,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';

export const FindGuides = ({navigation, route}) => {
  const [like, setLike] = useState('gray' ? 'red' : 'gray');
  const {guide} = route.params;

  return (
    <VStack px={4} flex={1} safeArea>
      <HStack alignItems={'center'}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
        />
        <Text>Go Back</Text>
      </HStack>

      <Box my={2} bg={'gray.200'} borderRadius={18}>
        <VStack space={4} alignItems={'center'} mt={4}>
          <Text fontSize={20}>{guide.title}</Text>

          <Image
            w={'90%'}
            h={200}
            alt="First Aid"
            source={guide.image && {uri: guide.image}}
            resizeMode="cover"
          />
        </VStack>
        <Box m={4} mt={2}>
          <Text fontSize={16}>{guide.body || guide.description}</Text>
        </Box>

        <HStack space={2} mx={4}>
          <IconButton
            onPress={() => setLike(like === 'gray' ? 'red' : 'gray')}
            icon={<Feather name={'thumbs-up'} color={like} size={25} />}
          />
          <IconButton
            onPress={() => alert('First Aid Guide Sharing coming soon')}
            icon={<Feather name={'share'} color={'green'} size={25} />}
          />
        </HStack>
      </Box>
    </VStack>
  );
};
