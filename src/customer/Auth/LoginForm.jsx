import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Button } from '@mui/material';
import { login, getUser } from '../../State/Auth/Action';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error)



  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)).then(() => {
        const role = localStorage.getItem("role");
        if (role === "2") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [jwt, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch(login(userData))
      .then(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          const userRole = localStorage.getItem("role");
          if (userRole) {
            localStorage.setItem("role", userRole);
          }
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });

  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='username'
              name='username'
              label='Username'
              fullWidth
              autoComplete='given-name'
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='password'
              name='password'
              label='Password'
              fullWidth
              autoComplete='password'
              type='password'
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--primary-color)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-color)' },
                '& .MuiFormHelperText-root': { color: 'var(--primary-color)' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-color)',
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
          {error && (
            <p id="error" className='text-red-800 ml-1 mt-2'>{error}</p>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => navigate("/forgot-password")}
            className='mt-2'
            size='small'
            sx={{
              textTransform: 'none',
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
