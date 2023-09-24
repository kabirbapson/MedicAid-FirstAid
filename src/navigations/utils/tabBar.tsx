/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Dimensions, StyleSheet, Linking} from 'react-native';
import {Pressable, Text} from 'native-base';
import NavigationIcon from './navigationIcon';
import {responsiveHeight} from '../../lib';

const {width} = Dimensions.get('window');

const TabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={[styles.mainItemContainer]}>
            <Pressable borderRadius={20} onPress={onPress}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NavigationIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>

            <Text
              lineHeight={20}
              fontSize="10"
              fontWeight="medium"
              color={isFocused ? 'primary.500' : 'gray.500'}>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.13,
  },
  mainItemContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(18),
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default TabBar;
