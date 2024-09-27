import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, findProductsById } from '../../State/Product/Action';
import { uploadImageToFirebase } from '../../firebase'; // Import the function
import { Typography, Grid, TextField, InputLabel, FormControl, Select, MenuItem, Button, Container, CircularProgress } from '@mui/material';
import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';

const BRANDS = [
    { brandId: 1, brandName: "H&M" },
    { brandId: 2, brandName: "Jara" },
];

const CATEGORY_LABELS = {
    1: 'T-shirt',
    2: 'Dress',
    3: 'Pants',
};

const GENDER_LABELS = {
    'Men': 'Men',
    'Women': 'Women',
    'Unisex': 'Unisex',

};

const initialSizes = [
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
];

const EditProductForm = () => {
    const param = useParams();
    const productID = param.productId;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        image: "",
        brandId: "",
        productName: "",
        color: "",
        currentPrice: "",
        gender: "",
        status: "active",
        createdById: localStorage.getItem("staffId"),
        productDetails: initialSizes,
        quantity: "",
        categoryId: "",
        description: "",
        material: "",
    });

    const defaultImage = 'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg';

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(defaultImage);

    const product = useSelector((state) => state.products.product);

    useEffect(() => {
        if (productID) {
            const fetchProduct = async () => {
                try {
                    dispatch(findProductsById({ productId: productID }));
                } catch (error) {
                    console.error('Error fetching product:', error);
                    setError('Error fetching product details. Please try again.');
                }
            };
    
            fetchProduct();
        }
    }, [dispatch, productID]);
    

    useEffect(() => {
        if (product) {
            setProductData({
                ...product,
                productDetails: product.productDetails || initialSizes,
                image: product.image || defaultImage,
                createdById: localStorage.getItem("staffId"),
            });
            setPreviewUrl(product.image || defaultImage);
            console.log("Product này", product)
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSizeChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSizes = [...productData.productDetails];
        updatedSizes[index][name] = value;
        setProductData((prevState) => ({
            ...prevState,
            productDetails: updatedSizes,
        }));
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);

            try {
                const imageUrl = await uploadImageToFirebase(selectedFile);
                setProductData((prevState) => ({
                    ...prevState,
                    image: imageUrl,
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('Error uploading image. Please try again.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!selectedFile && !productData.image) {
                setProductData((prevState) => ({
                    ...prevState,
                    image: defaultImage,
                }));
            }

            dispatch(updateProduct(productID, productData));
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Error updating product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-secondary'>
            <Header />
            <Container component="main" maxWidth="md" className='bg-white rounded-md'>
                <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5, fontFamily: 'Poppins' }} className='pt-5'>
                    Edit Product
                </Typography>
                <form onSubmit={handleSubmit} className='nb-5'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className='flex justify-center ml-10 items-center'>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                name="productName"
                                value={productData.productName}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ fontFamily: 'Poppins' }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    name="brandId"
                                    value={productData?.brand?.brandId || ''}
                                    onChange={handleChange}
                                    label="Brand"
                                    sx={{ fontFamily: 'Poppins' }}
                                >
                                    {BRANDS.map((brand) => (
                                        <MenuItem key={brand.brandId} value={brand.brandId}>
                                            {brand.brandName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                name="productName"
                                value={productData.productName}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ fontFamily: 'Poppins' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Color"
                                name="color"
                                value={productData.color}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ fontFamily: 'Poppins' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="currentPrice"
                                value={productData.currentPrice}
                                onChange={handleChange}
                                type="number"
                                variant="outlined"
                                sx={{ fontFamily: 'Poppins' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="categoryId"
                                    value={productData?.category?.categoryId || ''}
                                    onChange={handleChange}
                                    label="Category"
                                    sx={{ fontFamily: 'Poppins' }}
                                >
                                    {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
                                        <MenuItem key={id} value={id}>{label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={productData.gender}
                                    onChange={handleChange}
                                    label="Gender"
                                    sx={{ fontFamily: 'Poppins' }}
                                >
                                    {Object.entries(GENDER_LABELS).map(([value, label]) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{ fontFamily: 'Poppins' }}
                            />
                        </Grid>
                        {productData.productDetails.map((detail, index) => (
                            <Grid container item spacing={2} key={index}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Size Name"
                                        name="size"
                                        value={detail.size}
                                        onChange={(e) => handleSizeChange(e, index)}
                                        variant="outlined"
                                        sx={{ fontFamily: 'Poppins' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Quantity"
                                        name="quantity"
                                        value={detail.quantity}
                                        onChange={(e) => handleSizeChange(e, index)}
                                        type="number"
                                        variant="outlined"
                                        sx={{ fontFamily: 'Poppins' }}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : 'Update Product'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default EditProductForm;
