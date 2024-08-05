import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Rating } from '@mui/material';
import { styled } from '@mui/system';
import { createReview } from '../../../State/Review/Action';
import { useDispatch } from 'react-redux';

// Define the modal content styles directly
const ModalContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  padding: '16px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  outlineStyle: 'none',
  fontFamily: 'Poppins, sans-serif',
});

const ReviewModal = ({ open, handleClose, orderItemId, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Create review object
    const reviewData = {
      star: rating, // Use the rating state here
      content: review,
      createAt: new Date().toISOString(), // Current date-time
      status: 'active',
      productId: productId,
      orderItemId: orderItemId
    };

    console.log("ReviewData", reviewData);

    dispatch(createReview(reviewData));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-modal-title"
      aria-describedby="review-modal-description"
    >
      <ModalContent>
        <Typography id="review-modal-title" variant="h6" component="h2">
          Product review
        </Typography>
        <Box mt={2}>
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} className='red-color' variant="contained" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='bg-primary' variant="contained">
            Send
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
