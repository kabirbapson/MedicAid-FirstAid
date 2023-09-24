import * as yup from 'yup';

export const initialLoginValue = {
  username: '',
  password: '',
};

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username is Required'),
  password: yup.string().required('Password is required'),
});