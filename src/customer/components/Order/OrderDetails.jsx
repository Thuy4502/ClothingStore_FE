import React, { useEffect, useState } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import { Grid, Button, Box } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, cancelOrder } from '../../../State/Order/Action';
import ReviewModal from '../Review/ReviewModal';


const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = useParams();

    // Select order from Redux store
    const { order } = useSelector(state => state.order);

    // Fetch order details when component mounts or orderId changes
    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [orderId, dispatch]);

    // Handle cancel order button click
    const handleCancelOrder = () => {
        if (orderId) {
            dispatch(cancelOrder(orderId));
        }
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

    // Ensure `order.order` is an array
    const orderItems = Array.isArray(order?.order) ? order.order : [];
    const isOrderPlaced = order?.order?.[0].status === 'PENDING';
    const isDelivered = order?.order?.[0].status === 'DELIVERED';
    const reviewStatus = order?.order?.[0].reviewStatus;
    console.log("Trạng thái đã đánh giá", reviewStatus)


    return (
        <div className='px-5 lg:px-20'>
            <div>
                <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
                <AddressCard address={order?.order?.[0]} />
            </div>
            <div className='py-20'>
                <OrderTracker activeStep={2} />
            </div>
            <Grid container className='space-y-5'>
                {orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
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
                                        </p>
                                        <p>Seller: {item.brandName}</p>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item className='cursor-pointer' sx={{ display: isDelivered && reviewStatus !== 'REVIEWED' ? 'block' : 'none' }}>
                                <Box sx={{ color: '#ffb5b5', text: 'var(--primary-color)' }}>
                                    <StarBorderIcon sx={{ fontSize: '3rem' }} fontSize='2px' className='px-2' />
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
            <div className='mt-10 mb-10 flex justify-end'>
                <Button variant="contained" color="error" disabled={!isOrderPlaced} onClick={handleCancelOrder}>
                    Cancel
                </Button>
            </div>
            <ReviewModal 
                open={isModalOpen} 
                handleClose={handleCloseModal} 
                orderItemId={selectedOrderItemId} 
                productId={selectedProductId}
            />
        </div>
    );
};

export default OrderDetails;
