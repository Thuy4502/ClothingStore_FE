import { useState, useEffect } from 'react';
import { Button, Radio, RadioGroup } from '@headlessui/react';
import Rating from '@mui/material/Rating';
import ProductReviewCard from './ProductReviewCard';
import { Grid, LinearProgress, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { addItemToCart, getCart } from '../../../State/Cart/Action';
import { getProductReview } from '../../../State/Review/Action';
import { getActivePromotions } from '../../../State/Promotion/Action';
import { useLocation } from 'react-router-dom';

const jwt = localStorage.getItem("jwt");

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const products = useSelector(store => store.products);
    const location = useLocation();
    const promotionData = location.state?.promotion;
    const review = useSelector(store => store.review.productReviews.data);


    let discountValue = 0;


    const handleAddToCart = () => {
        if (!selectedSize) {
            setSnackbarMessage('Please select a size before adding to cart.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        const data = { productId: params.productId, size: selectedSize, price: discountValue, color: products.product?.color };
        dispatch(addItemToCart(data))
            .then(() => {
                setSnackbarMessage('Product added to cart successfully!');
                setSnackbarSeverity('success'); // Set severity to 'success'
                setOpenSnackbar(true);
            })
            .catch(() => {
                setSnackbarMessage('Failed to add product to cart.');
                setSnackbarSeverity('error'); // Set severity to 'error'
                setOpenSnackbar(true);
            });
    };

    useEffect(() => {
        const data = { productId: params.productId };
        dispatch(findProductsById(data));
        dispatch(getProductReview(params.productId));
    }, [params.productId]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            return 0;
        }

        const totalStars = reviews.reduce((acc, review) => {
            if (review && review.star) {
                return acc + review.star;
            }
            return acc;
        }, 0);

        const averageRating = totalStars / reviews.length;
        return averageRating.toFixed(1);
    };


    const averageRating = calculateAverageRating(review);

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li className="text-sm">
                            <a href={products.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {products.product?.productName}
                            </a>
                        </li>
                    </ol>
                </nav>
                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                src={products.product?.image || 'https://via.placeholder.com/350'}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    {/* Product info */}
                    <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 ">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{products.product?.productName}</h1>
                            <h1 className='text-lg lg-text-xl text-gray-900 opacity-60 pt-1'>
                                {products.product?.brand.brandName}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semibold'></p>
                                {/* <p className='font-bold'>${discountValue}</p> */}
                                <p className='font-bold'> ${products.product?.currentPrice}</p>
                                <p className='text-green-600 font-semibold'>
                                    {promotionData ? promotionData.name : ''}
                                </p>

                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center'>
                                    <Rating name="read-only" value={averageRating} readOnly />
                                    <p className='opacity-50 text-sm'>({averageRating})</p>
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>{review?.length} reviews</p>
                                </div>

                            </div>

                            <form className="mt-10">
                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {products.product?.productDetails.map((detail) => (
                                                <Radio
                                                    key={detail.productDetailId}
                                                    value={detail.size}
                                                    disabled={detail.quantity <= 0}
                                                    className={classNames(
                                                        detail.quantity > 0
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                    )}
                                                >
                                                    <span>{detail.size}</span>
                                                    {detail.quantity > 0 ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            >
                                                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>
                                <div className='flex space-between'>
                                    <button
                                        onClick={handleAddToCart}
                                        type="button"
                                        className="mt-10 flex items-center justify-center rounded-md border border-black px-8 py-3 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to cart
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/account/buy-now", {
                                            state: {
                                                size: selectedSize,
                                                product: products.product,
                                                promotion: promotionData // Passing promotion data
                                            }
                                        })}
                                        className="mt-10 ml-4 flex items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Buy now
                                    </button>

                                </div>

                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="font-semibold">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{products.product?.description}</p>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-sm font-semibold text-gray-900">Care Instructions</h2>
                                <p className="text-sm text-gray-600">{products.product?.careInstructions}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbarSeverity}
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
            <section>
                <h1 className='font-semibold text-lg pb-4'>Recent Review & Rating</h1>
                <div className='border p-5'>
                    <Grid container spacing={7}>
                        <Grid item xs={7}>
                            <div className='space-y-5'>
                                {review?.map((item) => <ProductReviewCard key={item.reviewId} review={item} />)}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </section>
        </div>

    );
}
