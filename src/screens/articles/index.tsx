import React, {useCallback, useEffect, useState} from 'react';
import {
  VStack,
  Text,
  Button,
  Box,
  HStack,
  Image,
  Avatar,
  CardItem,
  ScrollView,
  Pressable,
  IconButton,
  Body,
  Divider,
  Card,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {firstAid} from '../../data/first_aid';

const EmergencyContactCard = ({guide, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        h={150}
        p={2}
        borderWidth={1}
        borderColor={'gray.300'}
        bgColor={'primary.200'}
        rounded={'xl'}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Box w={'25%'} h={'full'} m={2}>
            <Image
              w={'full'}
              h={'full'}
              alt={'First Aid'}
              resizeMode={'contain'}
              source={guide.image && {uri: guide.image}}
            />

            {/* <Text>{guide.image}</Text> */}
          </Box>
          <VStack
            w={'75%'}
            px={2}
            // justifyContent={'space-evenly'}
            h={'full'}>
            <Text my={2} fontSize={'lg'} color={'primary.900'}>
              {guide.title}
            </Text>
            <Text mr={2} fontSize={'md'} color={'gray.500'}>
              {guide.body.substring(0, 80) + '...'}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export const Airticles = ({navigation}: {navigation: any}) => {
  return (
    <VStack px={'4'} flex={1} safeArea>
      <HStack alignItems={'center'}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
        />
        <Text>Go Back</Text>
      </HStack>

      <Box alignItems={'center'}>
        <Text fontSize={22} color={'red.500'} fontWeight={800}>
          FIRST AID GUIDE
        </Text>
      </Box>

      <ScrollView mt={2} showsVerticalScrollIndicator={false}>
        <VStack space={'4'}>
          {firstAid.map((guide, index) => (
            <EmergencyContactCard
              onPress={() => navigation.navigate('FindGuides', {guide})}
              guide={guide}
              key={index}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};
