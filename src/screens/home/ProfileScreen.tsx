import React, {useState} from 'react';
import {
  VStack,
  HStack,
  Select,
  Text,
  IconButton,
  Avatar,
  Button,
  Modal,
  Box,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {USER_LOGOUT} from '../../store/constants/auth';
import {selectLanguage} from '../../store/actions/language';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [changeLanguage, setChangeLanguage] = useState(false);
  const {locale} = useSelector(state => state.language);
  const {user} = useSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert('Log out?', 'Are you sure you want to logout', [
      {text: 'Cancel'},
      {text: 'Yes, Logout', onPress: () => dispatch({type: USER_LOGOUT})},
    ]);
  };

  const handleSelectLanguage = () => {
    dispatch(selectLanguage(selectedLanguage));
    setChangeLanguage(!changeLanguage);
  };
  return (
    <>
        <Modal isOpen={changeLanguage} onClose={() => setChangeLanguage(false)}>
          <Modal.Content>
            <Modal.Body>
              <VStack space={'3'}>
                <Text>Select your preferred language</Text>
                <Select
                  defaultValue={'english'}
                  onValueChange={value => setSelectedLanguage(value)}>
                  <Select.Item value={'hausa'} label={'Hausa'} />
                  <Select.Item value={'english'} label={'English'} />
                </Select>
                <Button onPress={handleSelectLanguage}>Continue</Button>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      <VStack space={'3'} flex={1}>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          pt={'60px'}
          px={'5'}
          pb={'2'}
          bgColor={'primary.500'}>
          <Text fontSize={'lg'} color={'white'} fontWeight={'semibold'}>
            Profile
          </Text>
          <IconButton
            icon={<Feather name="user" color={'white'} size={20} />}
          />
        </HStack>

        <VStack space={4} alignItems={'center'}>
          <Avatar size={'xl'}>
            {/* <Feather name={'user'} size={30} color={'white'} /> */}
            {user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
          </Avatar>
          <Text fontSize={'xl'} fontWeight={800}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
          <Text fontSize={'lg'} fontWeight={800}>
            {user.email}
          </Text>
          <Text mt={-2} fontSize={'lg'} fontWeight={800}>
            {user.phone}
          </Text>
        </VStack>

        <VStack flex={1} mt={4} px={'5'} space={6}>
          <Button onPress={() => setChangeLanguage(true)}>
            {(locale && locale.change_language_button) || 'Change Language'}
          </Button>

          <Button onPress={handleLogout}>
            {(locale && locale.logout_button) || 'Logout'}
          </Button>
        </VStack>
      </VStack>
      <Box
        // bg={'green.100'}
        position={'relative'}
        bottom={'20'}
        alignItems={'center'}>
        <Text fontSize={'xl'} fontWeight={800}>
          Medic-Aic First-Aid v1.0.0
        </Text>
        <Text fontSize={'sm'} fontWeight={400}>
          by
        </Text>
        <Text mb={2} fontSize={'xl'} fontWeight={800}>
          Jelila Mohammed
        </Text>
      </Box>
    </>
  );
};
