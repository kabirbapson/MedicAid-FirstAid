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
import YoutubePlayer, {getYoutubeMeta} from 'react-native-youtube-iframe';
import navigationIcon from '../../navigations/utils/navigationIcon';
import {Alert} from 'react-native';
import { useSelector } from 'react-redux';

export const VideoScreen = ({navigation}) => {
  const [playing, setPlaying] = useState(false);
  const [fetched, setFetched] = useState(false);
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

    {
      videoId: 'ddHKwkMwNyI',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: 'L06DNMRcy98',
      title: '',
      thumbnail_url: '',
    },
    {
      videoId: 'ASqdE2sqHgM',
      title: '',
      thumbnail_url: '',
    },
  ]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

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

  const {locale} = useSelector(state => state.language);


  return (
    <VStack px={'4'} flex={1} safeArea>
      <HStack alignItems={'center'}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<Feather name={'arrow-left'} color={'black'} size={20} />}
        />
        <Text>Go Back</Text>
      </HStack>
      {selectedVideo && (
        <>
          <Box borderRadius={'lg'} height={220} overflow={'hidden'}>
            <YoutubePlayer
              height={220}
              play={playing}
              videoId={selectedVideo.videoId}
              forceAndroidAutoplay={true}
              onChangeState={onStateChange}
            />
          </Box>
          <Button my={2} onPress={togglePlaying}>
            {playing ? 'Pause Video' : 'Play Video'}
          </Button>
        </>
      )}

      <Text mx={4} marginTop={'3'} fontSize={'lg'}>
      {(locale && locale.video_language) || 'First Aid Videos'}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack divider={<Divider />} width={'100%'} pt={'4'} space={'2'}>
          {videos.map((video, index) => (
            <Pressable
              key={index}
              width={'100%'}
              onPress={() => setSelectedVideo(video)}>
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
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};
