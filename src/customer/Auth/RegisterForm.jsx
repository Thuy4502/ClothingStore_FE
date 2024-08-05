import React, { useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action'; // Import đúng

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]); // Thêm dispatch vào dependency array

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      role_name: "CUSTOMER"

    };
    dispatch(register(userData));
    console.log("userData", userData);
  };

  return (
    <div>
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
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' }, // Màu cho label 
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' }, // Màu cho helper text
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd', // Màu border khi không focus
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi focus
                  },
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
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' }, // Màu cho label 
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' }, // Màu cho helper text
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd', // Màu border khi không focus
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi focus
                  },
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
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' }, // Màu cho label 
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' }, // Màu cho helper text
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd', // Màu border khi không focus
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi focus
                  },
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
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' }, // Màu cho label 
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' }, // Màu cho helper text
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd', // Màu border khi không focus
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi focus
                  },
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
              fullWidth
              autoComplete='password'
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' }, // Màu cho label 
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' }, // Màu cho helper text
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd', // Màu border khi không focus
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)', // Màu border khi focus
                  },
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
