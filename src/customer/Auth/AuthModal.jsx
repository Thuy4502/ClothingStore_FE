import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';
import OTPForm from './OTPForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const AuthModal = ({ handleClose, open }) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const location = useLocation();


  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === '/login' && <LoginForm />}
          {location.pathname === '/register' && <RegisterForm />}
          {location.pathname === '/forgot-password' && <ForgotPassword/>}
          {location.pathname === '/confirm-otp' && <OTPForm/>}


        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal

