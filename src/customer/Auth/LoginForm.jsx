import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import đúng
import { Grid, TextField, Button } from '@mui/material';
import { login, getUser } from '../../State/Auth/Action'; // Thêm import getUser nếu cần

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux store
  const auth = useSelector((state) => state.auth);
  const jwt = useSelector((state) => state.auth.jwt); // Đảm bảo jwt được định nghĩa và lấy từ store

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch(login(userData));
    console.log("userData", userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
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
                '& .MuiInputLabel-root': { color:  'var(--primary-color)'}, // Màu cho label
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
                '& .MuiInputLabel-root': { color:  'var(--primary-color)'}, // Màu cho label 
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
              className='bg-primary hover:bg-primary-hover w-full'
              type='submit'
              variant='contained'
              size='large'
              sx={{ padding: ".8rem 0" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <Button
              onClick={() => navigate("/forgot-password")}
              className='mt-2'
              size='small'
              sx={{ textTransform: 'none',
                color: 'var(--primary-color)'
               }}
            >
              Forgot Password?
            </Button>
          </Grid>
        
      </form>
      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>If you don't have an account?</p>
          <Button
            onClick={() => navigate("/register")}
            className='ml-5'
            size='small'
            sx={{ 
              color: 'var(--primary-color)'
             }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
