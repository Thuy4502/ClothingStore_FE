import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import OrderItem from '../Order/OrderItem'


const OrderSumary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { order } = useSelector(store => store);
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");
    
    console.log("--------------", order)

    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [orderId])


    const totalPrice = order?.order?.length > 0 ? order.order[0]?.totalAmount : 0;
    const orderItems = Array.isArray(order?.order.order) ? order.order.order : [];
    console.log("Cac chi tiet don hang", orderItems)
    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={orderItems[0]} />

            </div>
            <div>
                <div className='lg:grid grid-cols-3  relative mt-10'>
                    <div className='col-span-2'>
                        {orderItems?.map((item) => (
                            <OrderItem key={item.orderItemId
                            } item={item} />

                        ))}
                    </div>

                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border p-2 rounded-md'>
                            <p className='uppercase font-bold opacity-60 pb-4'>Price detail</p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10' >
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>{totalPrice}</span>
                                </div>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>$100</span>
                                </div>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Delivery charges</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <div className='flex justify-between pt-3 text-black font-bold'>
                                    <span>Total amount</span>
                                    <span>{totalPrice}</span>
                                </div>
                            </div>
                            <Button variant='contained' className='w-full mt-5' sx={{ px: '2.5rem', py: '.7rem', bgcolor: 'var(--primary-color)' }}>
                                Check out
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderSumary 