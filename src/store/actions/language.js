import AsyncStorage from '@react-native-async-storage/async-storage';
import {CHANGE_LANGUAGE, LOAD_LANGUAGE} from '../constants/language';

const loadCurrentLanguages = async () => {
  try {
    const currentLanguage = await AsyncStorage.getItem('language');
    if (currentLanguage) {
      return JSON.parse(currentLanguage);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const saveCurrentLanguages = async language => {
  try {
    await AsyncStorage.setItem('language', JSON.stringify(language));
  } catch (error) {}
};

export const loadLanguage = () => async (dispatch, getState) => {
  const currentLanguage = await loadCurrentLanguages();
  if (currentLanguage) {
    dispatch({type: LOAD_LANGUAGE, payload: currentLanguage});
  }
};

export const selectLanguage = language => async (dispatch, getState) => {
  const languages = getState().language.languages;
  const currentLanguage = languages.find(item => item.language === language);
  dispatch({type: CHANGE_LANGUAGE, payload: currentLanguage});
};
