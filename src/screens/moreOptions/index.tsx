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
import {faqs} from '../../data/faq';

export const MoreOptions = ({navigation}: {navigation: any}) => {
  return (
    <VStack px={'4'} flex={1} safeArea>
      <HStack alignItems={'center'}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
        />
        <Text>Go Back</Text>
      </HStack>

      <ScrollView style={{flex: 1, padding: 6}}>
        {faqs.map((faq, index) => (
          <Box
            bg={'blueGray.200'}
            p={2}
            rounded={10}
            key={index}
            style={{marginBottom: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {faq.question}
            </Text>
            <Divider bg={'gray.900'} w={'100%'} my={2} />

            <Text style={{marginTop: 5}}>{faq.answer}</Text>
          </Box>
        ))}
      </ScrollView>
    </VStack>
  );
};
