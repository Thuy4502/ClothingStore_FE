import React from 'react'
import { IconButton, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';


const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const discountPercent = localStorage.getItem("discountValue")
    const handleUpdateCartItem = (num) => {
        const data = { data: { quantity: item?.quantity + num }, cartItemId: item?.cartItemId }
        dispatch(updateCartItem(data))

    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item.cartItemId))
    }

    console.log("item cart---", item)


    return (
        <div className='p-5 shadow-lg border rounded-md'>
            <div className='flex items-center'>
                <div className='w-[6rem] h-[6rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className='w-full h-full object-cover object-top' src={item?.image || '/path/to/default-image.jpg'} alt="" />
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold mt-2'>{item?.productName}</p>
                    <p className='opacity-70'>Size: {item?.size}, {item?.color}</p>
                    {/* <p className='opacity-70 mt-2'>Seller: {item?.brandName}</p> */}
                    <div className='flex space-x-5 items-center text-gray-900'>
                        <p className='font-semibold'>Price: ${item.price}</p>
                        <p className='line-through opacity-50'> ${(item.price * 100) / discountPercent}</p>
                        <p className='text-green-600 font-semibold'>{discountPercent}% Off</p>
                    </div>
                    <div className='lg:flex items-center lg:space-x-10 pt-4'>
                        <div className='flex item-center space-x-2'>
                            <IconButton onClick={() => handleUpdateCartItem(-1)} sx={{ color: 'var(--primary-color)' }} disabled={item?.quantity <= 1}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <span className='py-1 px-7 border rounded-sm'>{item?.quantity}</span>
                            <IconButton onClick={() => handleUpdateCartItem(1)} sx={{ color: 'var(--primary-color)' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <div>
                            <Button onClick={handleRemoveCartItem} sx={{ color: 'var(--primary-color)' }}>remove</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem