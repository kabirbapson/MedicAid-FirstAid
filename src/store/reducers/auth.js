import EncryptedStorage from '@react-native-async-storage/async-storage';
import {
  SET_TOKEN,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  USER_LOGOUT,
  RESTORE_TOKEN,
  USER_RESTORING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  RESTORE_USERS,
  ADD_NEW_USER,
} from '../constants/auth';

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
  token: null,
  isAuthenticated: false,
  isRestoringUser: true,
  isLoading: false,
  user: null,
  collaborator: false,
  new_user: false,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isRestoringUser: false,
      };
    case USER_RESTORING:
      return {
        ...state,
        isRestoringUser: true,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case RESTORE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_NEW_USER:
      saveNewUserSession(action.payload);
      return {
        ...state,
        users: action.payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isRestoringUser: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      saveUserSession(action.payload.token, action.payload.collaborator);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      saveNewUserSession([...state.users, action.payload]);
      saveUserSession(action.payload);
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        new_user: true,
      };
    case AUTH_ERROR:
      removeUserSession();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isRestoringUser: false,
        collaborator: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case USER_LOGOUT:
      removeUserSession();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
