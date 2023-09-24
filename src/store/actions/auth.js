import EncryptedStorage from '@react-native-async-storage/async-storage';

import {
  USER_LOADING,
  USER_RESTORING,
  AUTH_ERROR,
  REGISTER_FAIL,
  ADD_NEW_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  RESTORE_USERS,
  USER_LOADED,
} from '../constants/auth';

const getUserSession = async () => {
  try {
    const user = await EncryptedStorage.getItem('user_session');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const getUsers = async () => {
  try {
    const users = await EncryptedStorage.getItem('users');
    if (users) {
      return JSON.parse(users);
    } else {
      return [];
    }
  } catch (error) {
    return null;
  }
};

export const restoreUser = () => async (dispatch, getState) => {
  dispatch({type: USER_RESTORING});

  const users = await getUsers();
  dispatch({type: RESTORE_USERS, payload: users});

  const user = await getUserSession();

  if (user) {
    dispatch({type: USER_LOADED, payload: user});
    return;
  }

  dispatch({type: AUTH_ERROR});
  return;
};

export const signUp = (userData, ErrorOccur) => (dispatch, getState) => {
  dispatch({type: USER_LOADING});
  const users = getState().auth.users;

  // check if user exist
  const isUserExist = users.filter(user => user.username === userData.username);

  if (isUserExist.length > 0) {
    ErrorOccur('Failed to register user with the same email already exist');
    dispatch({type: REGISTER_FAIL});
    return;
  }

  dispatch({type: ADD_NEW_USER, payload: [...users, userData]});

  dispatch({type: REGISTER_SUCCESS, payload: userData});
};

export const signIn = (userData, ErrorOccur) => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  const users = getState().auth.users;

  // check if user exist
  const currentUser = users.find(user => user.username === userData.username);

  if (!currentUser || currentUser.password !== userData.password) {
    ErrorOccur('Invalid password or username');
    dispatch({type: LOGIN_FAIL});
    return;
  }

  dispatch({type: LOGIN_SUCCESS, payload: userData});
};
