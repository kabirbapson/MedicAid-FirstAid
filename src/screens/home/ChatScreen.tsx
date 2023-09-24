import React, {useState} from 'react';
import {
  VStack,
  Text,
  HStack,
  IconButton,
  ScrollView,
  Actionsheet,
  Pressable,
  Avatar,
  useTheme,
  Button,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import {hospitals} from '../../data/hospitals';
import {Linking} from 'react-native';
import {openMapLocation} from '../../lib/location';
import { useSelector } from 'react-redux';

const EmergencyContactCard = ({data, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <VStack
        p={4}
        borderWidth={1}
        borderColor={'gray.300'}
        bgColor={'primary.200'}
        rounded={'xl'}>
        <Text fontSize={'lg'} color={'primary.600'}>
          {data.name}
        </Text>
        <Text fontSize={'md'} color={'gray.500'}>
          {data.subtitle}
        </Text>
        <Text>{data.address}</Text>
      </VStack>
    </Pressable>
  );
};

export const ChatScreen = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const {colors} = useTheme();

  const handleGetDirection = () => {
    openMapLocation(
      selectedHospital?.coord.longitude,
      selectedHospital?.coord.latitude,
      selectedHospital?.name,
    );
  };

  const {locale} = useSelector(state => state.language);
  return (
    <VStack space={'3'} safeArea flex={1} px={'5'}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'lg'} fontWeight={'semibold'}>
          {(locale && locale.hospitals) || 'Nearest Hospitals and Clinics'}
        </Text>
        <IconButton
          icon={<Icons name="hospital-o" color={'gray'} size={20} />}
        />
      </HStack>

      {/* nearest hospital data  */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={'4'}>
          {hospitals.map((data, index) => (
            <EmergencyContactCard
              onPress={() => setSelectedHospital(data)}
              data={data}
              key={index}
            />
          ))}
        </VStack>
      </ScrollView>

      <Actionsheet
        isOpen={selectedHospital}
        onClose={() => setSelectedHospital(null)}>
        <Actionsheet.Content bgColor={'white'}>
          <VStack
            width={'100%'}
            px={'6'}
            minHeight={500}
            alignItems={'center'}
            space={'4'}
            pt={'6'}>
            <Avatar size={'xl'} bgColor={'primary.100'}>
              <Icons
                alt={'hospitals'}
                name={'hospital-o'}
                size={30}
                color={colors.primary[800]}
              />
            </Avatar>
            <VStack
              borderWidth={'1'}
              borderColor={'gray.300'}
              p={'2'}
              rounded={'xl'}
              width={'100%'}>
              <Text color={'gray.500'} fontSize={'md'}>
                {'Name'}
              </Text>
              <Text fontSize={'lg'}>
                {selectedHospital && selectedHospital.name}
              </Text>
            </VStack>
            <VStack
              borderWidth={'1'}
              borderColor={'gray.300'}
              p={'2'}
              rounded={'xl'}
              width={'100%'}>
              <Text color={'gray.500'} fontSize={'md'}>
                {'Address'}
              </Text>
              <Text fontSize={'lg'}>
                {selectedHospital && selectedHospital.address}
              </Text>
            </VStack>
            <VStack
              borderWidth={'1'}
              borderColor={'gray.300'}
              p={'2'}
              rounded={'xl'}
              width={'100%'}>
              <Text color={'gray.500'} fontSize={'md'}>
                {'Contact'}
              </Text>
              <Text fontSize={'lg'}>
                {selectedHospital && selectedHospital.phone_number}
              </Text>
            </VStack>
            <Button
              onPress={handleGetDirection}
              leftIcon={<Feather name={'map-pin'} color={'white'} size={16} />}
              width={'full'}
              rounded={'full'}
              size={'lg'}>
              Get a direction
            </Button>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};
