import React, { useEffect, useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder, getOrderById } from '../../../State/Order/Action';
import OrderItem from '../Order/OrderItem';
import AddressCard from '../AddressCard/AddressCard';

const OrderSummary = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { order, cart } = useSelector((store) => store);
    const { address } = location.state || {};
    const discountPercent = localStorage.getItem("discountValue");

    const orderId = new URLSearchParams(location.search).get("order_id");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [orderId, dispatch]);

    useEffect(() => {
        if (order.createOrderSuccess) {
            setSnackbarMessage('Order created successfully!');
            setOpenSnackbar(true);
            dispatch({ type: 'RESET_CREATE_ORDER_SUCCESS' });
        }
    }, [order.createOrderSuccess, dispatch]);

    const handleSubmit = () => {
        if (address) {
            dispatch(createOrder({ address }))
                .then(() => {
                    setSnackbarMessage('Order placed successfully!');
                    setOpenSnackbar(true);
                })
                .catch(() => {
                    setSnackbarMessage('Failed to place the order.');
                    setOpenSnackbar(true);
                });
            // navigate(`/account/order/${orderId}`);
        }



    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    let discountRatio = 0;
    const discountedPrice = cart.cart?.data?.reduce((total, item) => total + item.price * item.quantity, 0);
    let totalDiscountedPrice = 0;
    

    const originPrice = (cart.cart?.data?.reduce((total, item) => total + item.price * item.quantity, 0) * 100)/discountPercent;


    return (
        <div>
            <div className='p-5 shadow-lg rounded-md border'>
                <AddressCard address={address} />
            </div>
            <div>
                <div className='lg:grid grid-cols-3 relative mt-10'>
                    <div className='col-span-2'>
                        {cart?.cart?.data?.map((item) => (
                            <OrderItem key={item.cartItemId} item={item} />
                        ))}
                    </div>
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border p-2 rounded-md'>
                            <p className='uppercase font-bold opacity-60 pb-4'>Price detail</p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>{originPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>${originPrice-discountedPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Delivery charges</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <div className='flex justify-between pt-3 text-black font-bold'>
                                    <span>Total amount</span>
                                    <span>{discountedPrice}</span>
                                </div>
                            </div>
                            <Button onClick={handleSubmit} variant='contained' className='w-full mt-5' sx={{ px: '2.5rem', py: '.7rem', bgcolor: 'var(--primary-color)' }}>
                                Check out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ zIndex: 1301 }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default OrderSummary;
