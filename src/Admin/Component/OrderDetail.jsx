import React, { useEffect, useState } from 'react';
import AddressCard from '../../customer/components/AddressCard/AddressCard';
import { Grid, Button, Box, Snackbar, Alert } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder } from '../../State/Order/Action';
import { getOrderById } from '../../State/Admin/Order/Action';
import ReviewModal from '../../customer/components/Review/ReviewModal';
import OrderTracker from '../../customer/components/Order/OrderTracker';
import Header from './Header';

const getOrderStep = (status) => {
    switch (status) {
        case 'PENDING':
            return 0;
        case 'CONFIRMED':
            return 1;
        case 'SHIPPED':
            return 2;
        case 'DELIVERED':
            return 3;
        case 'COMPLETED':
            return 4;
        case 'CANCELLED':
            return 5;
        default:
            return 0;
    }
};

const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { orderDetails } = useSelector(state => state.adminOrder);
    const { order } = orderDetails?.orderDetails || {};
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [orderCanceled, setOrderCanceled] = useState(false);



    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [orderId, dispatch]);

    console.log("Dong dat hang chi tiet", orderDetails)

    const handleCancelOrder = () => {
        if (orderId) {
            dispatch(cancelOrder(orderId))
                .then(() => {
                    setSnackbarMessage('Order canceled successfully!');
                    setSnackbarOpen(true);
                    setOrderCanceled(true);
                })
                .catch(() => {
                    setSnackbarMessage('Failed to cancel order.');
                    setSnackbarOpen(true);
                });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleOpenModal = (orderItemId, productId) => {
        setSelectedOrderItemId(orderItemId);
        setSelectedProductId(productId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const orderStatus = orderDetails?.[0]?.status || 'PENDING'; 
    const activeStep = getOrderStep(orderStatus);

    return (
        <div className='px-5 lg:px-20'>
            <Header/>
            <div className='py-20'>
                <OrderTracker activeStep={activeStep} />
            </div>

            <div className='flex justify-between mb-20 mt-5'>
                <div className='w-1/2  border rounded-e-lg pl-5'>
                    <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
                    <AddressCard address={orderDetails?.[0]} />
                </div>
                <div className='w-1/2 px-5 sticky top-0 mt-5 lg:mt-0'>
                    <div className='border p-2 rounded-md'>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price detail</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>${orderDetails?.[0].totalAmount}</span>
                            </div>
                            {/* <div className='flex justify-between pt-3 text-black'>
                                <span>Discount</span>
                                <span className='text-green-600'>$0</span>
                            </div> */}
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery charges</span>
                                <span className='text-green-600'>Free</span>
                            </div>
                            <div className='flex justify-between pt-3 text-black font-bold'>
                                <span>Total amount</span>
                                <span>${orderDetails?.[0].totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Grid container className='space-y-5'>
                {orderDetails?.length > 0 ? (
                    orderDetails.map((item, index) => (
                        <Grid
                            key={index}
                            item
                            container
                            className='shadow-xl rounded-md p-5 border'
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Grid item xs={6}>
                                <div className='flex items-center space-x-2'>
                                    <img
                                        className='w-[5rem] h-[5rem] object-cover object-top'
                                        src={item.image}
                                        alt="Product"
                                    />
                                    <div className='space-y-2 ml-5'>
                                        <p className='font-semibold'>{item.productName}</p>
                                        <p className='space-x-5 opacity-50 text-xs font-semibold'>
                                            <span>Color: {item.color}</span>
                                            <span> Size: {item.size}</span>
                                            <span>Quantity: {item.quantity}</span>
                                        </p>
                                        {/* <p>Seller: {item.brandName}</p> */}
                                        <p>Price: ${item.price}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item className='cursor-pointer' sx={{ display: order?.[0]?.status === 'DELIVERED' && order?.[0]?.reviewStatus !== 'REVIEWED' ? 'block' : 'none' }}>
                                <Box sx={{ color: '#ffb5b5', text: 'var(--primary-color)' }}>
                                    <StarBorderIcon sx={{ fontSize: '3rem' }} className='px-2' />
                                    <span onClick={() => handleOpenModal(item.orderItemId, item.productId)}>
                                        Rate & Review Product
                                    </span>
                                </Box>
                            </Grid>
                        </Grid>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </Grid>
        
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ zIndex: 1301 }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default OrderDetails;
