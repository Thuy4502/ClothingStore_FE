import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();

    const handleOrderDetail = () => {
        navigate(`/account/order/${order.orderId}`);
    };

    // Format the date to yyyy-mm-dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className='p-5 shadow-md hover:shadow-2xl border rounded-md'>
            <div onClick={handleOrderDetail} className='flex justify-between cursor-pointer'>
                <span className='w-1/5'>{order.orderId}</span>
                <span className='w-1/5'>{formatDate(order.orderDate)}</span>
                <span className='w-1/5'>{order.totalItem}</span>
                <span className='w-1/5'>${order.totalAmount.toFixed(2)}</span>
                <span className='w-1/5'>{order.status}</span>
            </div>
        </div>
    );
}

export default OrderCard;
