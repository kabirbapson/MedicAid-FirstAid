import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Input,
  Card,
  Pressable,
  Image,
  useTheme,
  Avatar,
  Modal,
  Select,
  Button,
  ScrollView,
  Divider,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectLanguage} from '../../store/actions/language';
import {getYoutubeMeta} from 'react-native-youtube-iframe';

export const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {locale} = useSelector(state => state.language);

  const {new_user, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([
    {
      videoId: '8assGpZvwG4',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: 'hdVKpUR513M',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: 'ASY_ImKX6B0',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: '-K4qJ9xJ51g',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: 'WqTL1zuBQVA',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: 'oswDpwzbAV8',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: '8qriKhpR0uU',
      title: '',
      thumbnail_url: '',
    },
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [fetched, setFetched] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const navigateToScreen = (route: string) => {
    navigate(route);
  };

  const handleSelectLanguage = () => {
    dispatch(selectLanguage(selectedLanguage));
  };
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);

  const getVideosData = async (videoId: string) => {
    setLoading(true);
    try {
      const meta = await getYoutubeMeta(videoId);

      setVideos(prev =>
        prev.map(video => {
          if (video.videoId === videoId) {
            return {
              ...video,
              title: meta.title,
              thumbnail_url: meta.thumbnail_url,
            };
          }

          return video;
        }),
      );
    } catch (error) {
      // error
    }

    setLoading(false);
  };

  const handleResolveVideos = useCallback(async () => {
    Promise.resolve(videos.map(video => getVideosData(video.videoId)));
  }, [videos]);

  useEffect(() => {
    if (!fetched) {
      handleResolveVideos();
      setFetched(true);
    }
  }, [fetched, handleResolveVideos]);

  return (
    <>
      <Modal isOpen={new_user && locale === null}>
        <Modal.Content>
          <Modal.Body>
            <VStack space={'3'}>
              <Text>Welcome to MedicAid First Aid</Text>
              <Text>You can start by selecting your preferred language</Text>
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
      <VStack space={'3'} safeArea flex={1} px={'5'}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={'lg'}>
            {(locale && locale.welcome_message + ', ') || 'Welcome, '}
            {user?.firstName} {user?.lastName}
          </Text>
          <IconButton icon={<Feather name="bell" color={'gray'} size={20} />} />
        </HStack>
        <Input
          borderColor={'gray.500'}
          rounded={10}
          fontSize={'lg'}
          placeholder="Search for first aid..."
        />

        {/* feature thing to learn  */}
        <VStack
          space={'2'}
          minH={200}
          width={'100%'}
          justifyContent={'flex-end'}>
          <Image
            width={'100%'}
            alt={'close'}
            rounded={'20'}
            position={'absolute'}
            zIndex={-1}
            height={'100%'}
            source={{
              uri: 'https://images.unsplash.com/photo-1630964046403-8b745c1e3c69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2920&q=80',
            }}
          />
          <Box
            p={'4'}
            borderBottomRadius={'20'}
            minHeight={50}
            bgColor={'rgba(0,0,0,0.5)'}>
            <Text fontWeight={700} color={'white'}>
              {(locale && locale.image_holder) ||
                'Immediate first aid for a person with stroke'}
            </Text>
          </Box>
        </VStack>

        {/* application features */}

        <VStack space={'2'} mt={'3'}>
          <HStack alignItems={'center'} justifyContent={'space-evenly'}>
            <VStack alignItems={'center'} space={'1'}>
              <Pressable onPress={() => navigateToScreen('Videos')}>
                {({isPressed}) => (
                  <Box
                    rounded={'full'}
                    bgColor={isPressed ? 'primary.500' : 'gray.200'}
                    padding={'4'}>
                    <Feather
                      name={'video'}
                      color={isPressed ? 'white' : colors.primary[500]}
                      size={25}
                    />
                  </Box>
                )}
              </Pressable>
              <Text fontSize={'13px'}>
                {(locale && locale.video_learn) || 'Videos'}
              </Text>
            </VStack>

            <VStack alignItems={'center'} space={'1'}>
              <Pressable onPress={() => navigateToScreen('Articles')}>
                {({isPressed}) => (
                  <Box
                    rounded={'full'}
                    bgColor={isPressed ? 'primary.500' : 'gray.200'}
                    padding={'4'}>
                    <Ionicons
                      name={'document-text-outline'}
                      color={isPressed ? 'white' : colors.primary[500]}
                      size={25}
                    />
                  </Box>
                )}
              </Pressable>
              <Text fontSize={'13px'}>
                {' '}
                {(locale && locale.find_guides) || 'Find Guide'}
              </Text>
            </VStack>

            <VStack alignItems={'center'} space={'1'}>
              <Pressable onPress={() => navigateToScreen('FirstAid')}>
                {({isPressed}) => (
                  <Box
                    rounded={'full'}
                    bgColor={isPressed ? 'primary.500' : 'gray.200'}
                    padding={'4'}>
                    <Ionicons
                      name={'briefcase-outline'}
                      color={isPressed ? 'white' : colors.primary[500]}
                      size={25}
                    />
                  </Box>
                )}
              </Pressable>
              <Text fontSize={'13px'}>
                {(locale && locale.first_aid) || 'First Aid'}
              </Text>
            </VStack>

            <VStack alignItems={'center'} space={'1'}>
              <Pressable onPress={() => navigateToScreen('MoreOptions')}>
                {({isPressed}) => (
                  <Box
                    rounded={'full'}
                    bgColor={isPressed ? 'primary.500' : 'gray.200'}
                    padding={'4'}>
                    <Ionicons
                      name={'grid-outline'}
                      color={isPressed ? 'white' : colors.primary[500]}
                      size={25}
                    />
                  </Box>
                )}
              </Pressable>
              <Text fontSize={'13px'}>
                {(locale && locale.more) || 'FAQs'}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {/* <Text marginTop={'3'} fontSize={'lg'}>
          {(locale && locale.video_learn) || 'First Aid Videos'}
        </Text> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack divider={<Divider />} width={'100%'} pt={'4'} space={'2'}>
            {videos.map((video, index) => (
              <Pressable
                key={index}
                width={'100%'}
                onPress={() => {
                  navigate('Videos', {videoId: video.videoId});
                }}>
                <HStack space={'3'} p={'3'} rounded={'xl'}>
                  <Box
                    bgColor={'gray.700'}
                    rounded={'md'}
                    width={'40px'}
                    height={'40px'}>
                    <Image
                      rounded={'xl'}
                      width={'100%'}
                      height={'100%'}
                      alt={'thumbnail'}
                      source={{
                        uri: video.thumbnail_url || undefined,
                      }}
                    />
                  </Box>
                  <VStack width={'100%'} pr={'20'}>
                    <Text fontSize={'sm'}>{video.title}</Text>
                  </VStack>
                </HStack>
                <Divider bg={'gray.400'} />
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </>
  );
};
