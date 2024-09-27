import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../State/store';
import { getCart } from '../../../State/Cart/Action';

function Cart() {
    const navigate = useNavigate();
    const { cart } = useSelector(store => store)
    const dispatch = useDispatch();
    const {promotions } = useSelector(store => store);
    let discountPercent = 0;
    let originPrice = 0;

    // useEffect(() => {
    //     dispatch(getActivePromotions());
    // }, [dispatch]);
    
    if (promotions && promotions.activePromotions && Array.isArray(promotions.activePromotions.data) && promotions.activePromotions.data.length > 0) {
        const promotion = promotions.activePromotions.data[0];
        if (promotion && typeof promotion.discountValue === 'number') {
            discountPercent = promotion.discountValue;
            originPrice = (cart.cart?.data?.reduce((total, item) => total + item.price * item.quantity, 0) * 100)/discountPercent;
        } else {
            console.log("Discount value is not a number");
        }
    } else {
        console.log("No active promotions or data is not in expected format");
    }
    const handleCheckout = () => {
        navigate('/checkout?step=2')
    }
    useEffect(() => {
        dispatch(getCart())
    }, [cart.updateCartItem, cart.deleteCartItem])

    const discountedPrice = cart.cart?.data?.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative mt-10'>
                <div className='col-span-2 space-y-3'>
                    {cart.cart?.data?.map((item) => (
                        <CartItem key={item.cartItemId} item={item} />
                    
                    ))}
                </div>

                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border p-2 rounded-md'>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price detail</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10' >
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>{originPrice || '0'}</span>
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
                                <span>${discountedPrice || '0'}</span>
                            </div>
                        </div>
                        <Button onClick={handleCheckout} variant='contained' className='w-full mt-5' sx={{ px: '2.5rem', py: '.7rem', bgcolor: 'var(--primary-color)' }}>
                            Check out
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart