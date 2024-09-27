import React from 'react'
import { IconButton, Button} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';


const OrderItem = ({item}) => {
    const dispatch=useDispatch();
    const discountPercent = localStorage.getItem("discountValue");
    let originalPrice = (item?.price*100)/discountPercent;
    const handleUpdateCartItem = (num)=> {
        const data={data: {quantity:item?.quantity+num}, cartItemId:item?.cartItemId}
        dispatch(updateCartItem(data))

    }

    const handleRemoveCartItem =()=> {
        dispatch(removeCartItem(item.cartItemId))
    }

    console.log("Itemmmmm", item)


    return (
        <div className='p-5 shadow-lg border rounded-md'>
            <div className='flex items-center'>
                <div className='w-[6rem] h-[6rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className='w-full h-full object-cover object-top' src={item?.image || '/path/to/default-image.jpg'} alt="" />
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{item?.productName}</p>
                    <p className='opacity-70'>Size: {item?.size}, {item?.color}</p>
                    {/* <p className='opacity-70 mt-2'>Seller: {item?.brand_name}</p> */}

                    <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                        <p className='font-bold'>Price: ${item?.price}</p>
                        <p className='text-gray-600 line-through'>${originalPrice}</p>
                        <p className='text-green-600 font-semibold'>{discountPercent}% Off</p>
                    </div>
                    <div className='lg:flex items-center lg:space-x-10 pt-4'>
                        <div className='flex item-center space-x-2'>
                            <span className='py-1 px-7 border rounded-sm'>{item?.quantity}</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem