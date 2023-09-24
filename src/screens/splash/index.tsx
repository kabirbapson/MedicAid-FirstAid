import {Box, Image, Text} from 'native-base';

export const SplashScreen = () => {
  return (
    <Box
      flex={1}
      safeArea
      bgColor={'primary.500'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Image
        width={100}
        height={100}
        alt={'first'}
        source={require('../../assets/images/first-aid-kit.png')}
      />
      <Text
        textAlign={'center'}
        fontSize={'25'}
        fontWeight={'bold'}
        letterSpacing={'10'}>
        Medic-Aid
      </Text>
      <Text fontSize={'16'}>First Aid</Text>
    </Box>
  );
};
