import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';

const orderStatus = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Cancelled', value: 'CANCELLED' },
];

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector(store => store.order);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch]);

    useEffect(() => {
        // Filter orders by selected status
        if (orders) {
            const filtered = selectedStatus
                ? orders.filter(order => order.status === selectedStatus)
                : orders;
            setFilteredOrders(filtered);
        }
    }, [orders, selectedStatus]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const calculateTotal = () => {
        return filteredOrders.reduce((acc, order) => acc + order.total, 0);
    };

    return (
        <div className='px-5 lg:px-20'>
            <Grid container sx={{ justifyContent: 'space-between' }} className='mt-10'>
                <Grid item xs={2.5}>
                    <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className='font-bold text-lg'>Filter</h1>
                        <div className='space-y-4 mt-10'>
                            <h1 className='font-semibold'>Order status</h1>
                            {orderStatus.map((option) => (
                                <div key={option.value} className='flex items-center'>
                                    <input
                                        value={option.value}
                                        type="radio"
                                        name="orderStatus"
                                        checked={selectedStatus === option.value}
                                        onChange={handleStatusChange}
                                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label className='ml-3 text-sm text-gray-600'>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='space-y-3'>
                        {/* Tiêu đề cột */}
                        <div className='flex justify-between font-bold'>
                            <span className='w-1/5'>ID</span>
                            <span className='w-1/5'>DATE</span>
                            <span className='w-1/5'>QUANTITY</span>
                            <span className='w-1/5'>TOTAL</span>
                            <span className='w-1/5'>STATUS</span>
                        </div>

                        {/* Dữ liệu đơn hàng */}
                        <div className='space-y-3 pb-5'>
                            {filteredOrders.length > 0 ? (
                                <>
                                    {filteredOrders.map((item) => (
                                        <OrderCard key={item.id} order={item} />
                                    ))}
                                    {/* <div className='font-bold text-lg mt-4'>
                                        Total Amount: ${calculateTotal().toFixed(2)}
                                    </div> */}
                                </>
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Order;
