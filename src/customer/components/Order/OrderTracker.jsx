import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

const steps = [
    'PENDING',
    'CONFIRMED',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED'
];

const OrderTracker = ({ activeStep }) => {
  return (
    <div className='w-full'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel sx={{ color: '#9155FD', fontSize: '1rem' }}>
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
  );
};

export default OrderTracker;
