import React from 'react'
import {Avatar, Box, Grid, Rating} from '@mui/material'
import dayjs from 'dayjs';


const ProductReviewCard = (item) => {
    const formattedDate = dayjs(item.review.createAt).format('DD/MM/YYYY');
    console.log("đánh giá", item)
  return (
    <div>
        <Grid container spacing={2} gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{width:56, height:56, bgcolor:"#9155fd"}}>
                    T
                    </Avatar>
                </Box>
            </Grid>
            <Grid item xs={9}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>{item.review.customer.lastName} {item.review.customer.firstName}</p>
                            <p className='opacity-70'>{formattedDate}</p>
                        </div>
                    </div>
                    <Rating value={item.review.star} name='half-rating' readOnly precision={1}/>
                    <p>{item.review.content}</p>
                </Grid>
        </Grid>
    </div>
  )
}

export default ProductReviewCard