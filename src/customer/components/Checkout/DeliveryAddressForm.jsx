import React from 'react'
import AddressCard from '../AddressCard/AddressCard'

import { Grid, Button, Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';




const DeliveryAddressForm = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const hanleSubmit=(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const address={
            customerName: data.get('firstName') + data.get('lastName'),
            customerPhone:data.get('phoneNumber'),
            customerEmail:data.get('email'),
            customerAddress: data.get('address')

        }
        console.log("address", address)
        const orderData={address, navigate}
        dispatch(createOrder(orderData))
        console.log("order data", orderData)
    }
    return (
        <div>
            <Grid container spacing={4}>
                <Grid xs={12} lg={5} className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>
                    <div className='p-5 py-7 border-b cursor-pointer'>
                        <AddressCard />
                        <Button sx={{ mt: 2, bgcolor: 'var(--primary-color)' }} size='large' variant='contained'>Deliver here</Button>
                    </div>
                </Grid>
                <Grid item xs={12} lg={7}>
                    <Box className='borde round-s-md shadow-md p-5'>
                        <form onSubmit={hanleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    fullWidth
                                    autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    fullWidth
                                    autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    id="address"
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    autoComplete="given-name"
                                    multiline
                                    rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    fullWidth
                                    autoComplete="given-name"
                                    rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="given-name"
                                    rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button sx={{py:1, mt:2, bgcolor:'var(--primary-color)', color: '#ffffff'}} size='large' variant='container' type='submit'>
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                           
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default DeliveryAddressForm