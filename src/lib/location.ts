import {showLocation} from 'react-native-map-link';
import {Platform} from 'react-native';

export const openMapLocation = (longitude, latitude, title) => {
  const iOS = Platform.OS === 'ios';
  showLocation({
    latitude: latitude,
    longitude: longitude,
    title: title, // optional
    googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
    googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58', // optionally specify the google-place-id
    alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
    dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
    dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
    cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
    appsWhiteList: iOS ? ['apple-maps'] : ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
    naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
    // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
    // app: 'uber',  // optionally specify specific app to use
    directionsMode: 'car', // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
  });
};
