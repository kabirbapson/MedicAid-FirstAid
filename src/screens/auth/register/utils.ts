import * as yup from 'yup';

export const initialRegisterValue = {
  fullName: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
};

export const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  phoneNumber: yup
    .string()
    .matches(/(\d){11}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()

    // .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    // .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    // .matches(/\d/, 'Password must have a number')
    // .matches(
    //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //   'Password must have a special character',
    // )
    // .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
