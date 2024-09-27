import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, TextField, Button, IconButton, Snackbar, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { orderBuyNow } from '../../../State/Order/Action';

const BuyNow = () => {
    const { products, promotions } = useSelector((store) => store);
    const location = useLocation();
    const { size, product } = location.state || {};
    const [quantity, setQuantity] = useState(1);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const promotionData = location.state?.promotion;
    const handleIncrease = () => setQuantity(quantity + 1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCheckout = () => navigate('/checkout?step=2');
    const point = localStorage.getItem("point");
    console.log("Điểm của người dùng ", point)

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const address = {
            customerName: `${data.get('firstName')} ${data.get('lastName')}`,
            customerPhone: data.get('phoneNumber'),
            customerEmail: data.get('email'),
            customerAddress: data.get('address'),
        };

        const orderData = {
            totalAmount: discountedTotal,
            totalItem: quantity,
            customerPhone: address.customerPhone,
            customerEmail: address.customerEmail,
            customerName: address.customerName,
            customerAddress: address.customerAddress,
            status: 'PENDING',
            productId: product?.productId || '',
            orderItemId: '',
            price: product?.currentPrice.toFixed(2),
            quantity: quantity,
            size: size || '',
            reviewStatus: '',
            color: product?.color || '',
            image: product?.image || '',
            brandName: product?.brandName || '',
        };

        console.log('Order data', orderData);

        dispatch(orderBuyNow(orderData))
            .then(() => {
                setSnackbarMessage('Order placed successfully!');
                setOpenSnackbar(true);
                // handleCheckout(); // Navigate to checkout page
            })
            .catch(() => {
                setSnackbarMessage('Failed to place the order.');
                setOpenSnackbar(true);
            });
    };
    let discountPercent = 0;
    let discountValue = 0;
    let originalTotal = (quantity * product.currentPrice).toFixed(2);
    let discountedTotal = originalTotal;

  
    if (promotionData?.type === 'BUY_2_PAY_1' && quantity >= 2) {
        discountedTotal = Math.ceil(quantity / 2) * product?.currentPrice;
        console.log("Gía khi mua 2 tặng 1", discountedTotal)
        if (point >= 100) {
            discountedTotal = discountedTotal * (1 - 0.1); // Giảm thêm 10% cho khách hàng thân thiết
        }
    }
    else if (promotionData?.type === 'BUY_2_PAY_1' && quantity < 2) {
        discountedTotal = product?.currentPrice * quantity;
        if (point >= 100) {
            discountedTotal = discountedTotal * (1 - 0.1); // Giảm thêm 10% cho khách hàng thân thiết
        }
    }


    // Điều kiện 3: Mua 3 tính tiền 2, chỉ áp dụng khi mua từ 3 sản phẩm trở lên
    if (promotionData?.type === 'BUY_3_PAY_2' && quantity >= 3) {
        if (quantity % 3 != 0) {
            discountedTotal = [Math.ceil(quantity / 3) + (quantity % 3)] * product?.currentPrice;
            console.log("Gia ne ", discountedTotal)
        }
        else {
            discountedTotal = [Math.ceil(quantity / 3) * 2] * product?.currentPrice;

        }
        if (point >= 100) {
            discountedTotal = discountedTotal * (1 - 0.1); 
        }
    }
    else if (promotionData?.type === 'BUY_3_PAY_2' && quantity <= 2) {
        discountedTotal = product?.currentPrice * quantity;
        if (point >= 100) {
            discountedTotal = discountedTotal * (1 - 0.1); 
        }
    }

    // Trường hợp không có khuyến mãi nhưng là khách hàng thân thiết
    if (!promotionData && point >= 100) {
        discountedTotal = originalTotal * (1 - 0.1); // Chỉ áp dụng giảm giá 10% cho khách hàng thân thiết
    }




    return (
        <div className='mb-64'>
            <Grid container spacing={4}>
                <Grid item xs={12} lg={7}>
                    <Box className='border rounded-md shadow-md p-5'>
                        <p className='text-xl'>Enter Address Here</p>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="shipping address"
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="tel"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        autoComplete="email"
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: 'var(--primary-color)' }}>
                                Check Out
                            </Button>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={5} className='mt-10 lg:mt-0'>
                    <Box className='border rounded-md p-5'>
                        <div className='flex'>
                            <img
                                src={product?.image || '/path/to/default-image.jpg'}
                                alt={product?.productName || 'Product Image'}
                                className='w-[6rem] h-[6rem] lg:w-[9rem] lg:h-[9rem] object-cover'
                            />
                            <Box ml={2}>
                                <p className='font-semibold'>{product?.productName}</p>
                                <p className='opacity-70'>Size & Color: {size}, {product?.color}</p>
                                <div className='flex items-center mt-2'>
                                    <p>Price:</p>
                                    <p className='font-bold ml-2'>${product?.currentPrice}</p>
                                    <p className='text-green-600 ml-10 font-semibold'>
                                        {promotionData ? promotionData.name : ''}
                                    </p>

                                </div>
                                <div className='flex items-center mt-4'>
                                    <IconButton onClick={handleDecrease} disabled={quantity <= 1} sx={{ color: 'var(--primary-color)' }}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                    <span className='px-4 border rounded-sm'>{quantity}</span>
                                    <IconButton onClick={handleIncrease} sx={{ color: 'var(--primary-color)' }}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </div>
                            </Box>
                        </div>
                        <div className='mt-5'>
                            <p className='uppercase font-bold opacity-60 pb-2'>Price Detail</p>
                            <hr />
                            <div className='font-semibold mt-3'>
                                <div className='flex justify-between py-2'>
                                    <span>Price</span>
                                    <span>${originalTotal}</span>
                                </div>
                                <div className='flex justify-between py-2'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>${originalTotal-discountedTotal}</span>
                                </div>
                                <div className='flex justify-between py-2'>
                                    <span>Delivery Charges</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <div className='flex justify-between py-2 font-bold'>
                                    <span>Total Amount</span>
                                    <span id="totalAmount">${discountedTotal}</span>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>

            {/* Snackbar for notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default BuyNow;
