import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import {responsiveHeight} from '../../lib';
import {useTheme} from 'native-base';

const routeName: {[key: string]: string} = {
  Home: 'home',
  Emergency: 'phone',
  Hospital: 'hospital-o',
  Profile: 'user-o',
};

export default function navigationIcon({
  route,
  isFocused,
}: {
  route: string;
  isFocused: boolean;
}) {
  const themes = useTheme();
  return (
    <Icons
      name={routeName[route]}
      size={responsiveHeight(18)}
      color={isFocused ? themes.colors.primary[500] : themes.colors.gray[400]}
    />
  );
}
