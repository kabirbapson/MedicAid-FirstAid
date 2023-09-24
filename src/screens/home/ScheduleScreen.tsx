import {Text, VStack, HStack, IconButton, Box, ScrollView} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {emergency} from '../../data/emergency';
import {Linking} from 'react-native';
import { useSelector } from 'react-redux';

const EmergencyContactCard = ({data}) => {
  return (
    <VStack p={4} borderWidth={1} borderColor={'gray.300'} rounded={'xl'}>
      <Text fontSize={'lg'} color={'primary.600'}>
        {data.title}
      </Text>
      <Text fontSize={'md'} color={'gray.500'}>
        {data.subtitle}
      </Text>
      <Text>{data.address}</Text>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'lg'} color={'green.500'}>
          Contact: {data.phone_number}
        </Text>
        <IconButton
          onPress={() => Linking.openURL(`tel:${data.phone_number}`)}
          variant={'solid'}
          rounded={'full'}
          icon={<Feather name={'phone'} size={16} color={'white'} />}
        />
      </HStack>
    </VStack>
  );
};

export const ScheduleScreen = () => {
  const {locale} = useSelector(state => state.language);
  return (
    <VStack space={'3'} safeArea flex={1} px={'5'}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'lg'} fontWeight={'semibold'}>
          {(locale && locale.emergency) || 'Emergency Contact'}
        </Text>
        <IconButton icon={<Feather name="phone" color={'gray'} size={20} />} />
      </HStack>

      {/* emergency Contact card */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={'4'}>
          {emergency.map((data, index) => (
            <EmergencyContactCard data={data} key={index} />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};
