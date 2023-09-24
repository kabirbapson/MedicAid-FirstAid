import EncryptedStorage from '@react-native-async-storage/async-storage';
import {CHANGE_LANGUAGE, LOAD_LANGUAGE} from '../constants/language';

async function saveUserSession(payload) {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(payload));
  } catch (error) {
    // There was an error on the native side
  }
}

async function saveNewUserSession(users) {
  try {
    await EncryptedStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    // There was an error on the native side
  }
}

async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem('user_session');
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

const initialState = {
  languages: [
    {
      language: 'hausa',
      logout_button: "Fita Daga Na'urar",
      change_language_button: 'Canja Harshe',
      welcome_message: 'Barka',
      first_aid: 'Agajin Gaggawa',
      video_language: 'Bidiyo na taimakon gaggawa',
      video_learn: 'Kalli Bidiyo',
      find_guides: 'Nemo Jagora',
      more: 'Amsoshi',
      image_holder: 'Taimakon farko ga mutumin da ke fama da bugun jini',
      emergency: 'Tuntuɓar Gaggawa',
      hospitals: 'Asibitoci mafi kusa',
    },
    {
      language: 'english',
      logout_button: 'Logout',
      change_language_button: 'Change Languagge',
      welcome_message: 'Welcome',
      first_aid: 'First Aid',
      video_language: 'First aid videos',
      video_learn: 'Tutorials',
      find_guides: 'Find Guides',
      more: 'FAQs',
      image_holder: 'Immediate first aid for a person with stroke',
      emergency: 'Emergency Contact',
      hospitals: 'Nearest Hospitals and Clinics',
    },
  ],
  locale: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LANGUAGE:
    case CHANGE_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
      };

    default:
      return state;
  }
}
