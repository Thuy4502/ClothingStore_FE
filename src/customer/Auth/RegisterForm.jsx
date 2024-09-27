import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action'; 

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    // Add other validations if necessary
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const userData = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        role_name: "CUSTOMER"
      };
      dispatch(register(userData));
      console.log("userData", userData);
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id='username'
              name='username'
              label='Username'
              fullWidth
              autoComplete='given-name'
              value={formValues.username}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: 'var(--primary-color)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary-color)' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id='firstname'
              name='firstname'
              label='First name'
              fullWidth
              autoComplete='given-name'
              value={formValues.firstname}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: 'var(--primary-color)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary-color)' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id='lastname'
              name='lastname'
              label='Last name'
              fullWidth
              autoComplete='given-name'
              value={formValues.lastname}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: 'var(--primary-color)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary-color)' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              fullWidth
              autoComplete='email'
              value={formValues.email}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: 'var(--primary-color)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary-color)' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id='password'
              name='password'
              label='Password'
              type='password'
              fullWidth
              autoComplete='password'
              value={formValues.password}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: 'var(--primary-color)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary-color)' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              fullWidth
              autoComplete='new-password'
              value={formValues.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: 'var(--primary-color)' },
                  '&.Mui-focused fieldset': { borderColor: 'var(--primary-color)' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className='bg-primary w-full'
              type='submit'
              variant='contained'
              size='large'
              sx={{ padding: ".8rem 0" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>If you have an account?</p>
          <Button onClick={() => navigate("/login")} className='ml-5' size='small' sx={{ 
              color: 'var(--primary-color)'
             }} >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
