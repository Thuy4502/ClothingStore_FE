import {React, useEffect} from 'react'
import { Grid, Button, Box, TextField } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = (item) => {
  const navigate = useNavigate();

    const handleOrderDetail = () => {
      navigate(`/account/order/${item.order.orderId}`);
     
    };

  return (
    <div className='p-5 shadow-md hover:shadow-2xl border rounded-md'>

      {/* <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={6}>
          <div className='flex cursor-pointer'>
            <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="" />
            <div className='ml-5 space-y-2'>
              <p className=''>T-shirt Basic</p>
              <p className='opacity-50 text-xs font-semibold'>Sixe: M</p>
              <p className='opacity-50 text-xs font-semibold'>Color: Black</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>$100</p>
        </Grid>
        <Grid item xs={4}>


          {true &&
            <div>
              <p>
                <AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2' />
                <span>
                  Deliver On March 03
                </span>
              </p>
              <p className='text-xs'>Your Item has Been Delivered</p>
            </div>}
          {false && <p>
            <span>
              Expected Delivery On Mar 03
            </span>
          </p>}
        </Grid>
      </Grid> */}


      <div onClick={handleOrderDetail} className='flex justify-between'>
        <span className='w-1/5'>{item.order.orderId}</span>
        <span className='w-1/5'>{item.order.orderDate}</span>
        <span className='w-1/5'>{item.order.totalItem}</span>
        <span className='w-1/5'>{item.order.totalAmount}</span>
        <span className='w-1/5'>{item.order.status}</span>
      </div>
    </div>
  )
}

export default OrderCard