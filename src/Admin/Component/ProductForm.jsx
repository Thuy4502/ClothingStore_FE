import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { uploadImageToFirebase } from '../../firebase'; // Import the function
import { Typography, Grid, TextField, InputLabel, FormControl, Select, MenuItem, Button, Container, CircularProgress } from '@mui/material';
import Header from './Header';

const initialSizes = [
  { size: "S", quantity: 0 },
  { size: "M", quantity: 0 },
  { size: "L", quantity: 0 },
  { size: "XL", quantity: 0 },
];

// Đặt đường dẫn đến ảnh mặc định trong thư mục public
const defaultImage = 'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg'; // Đảm bảo ảnh mặc định nằm trong thư mục public

const CreateProductForm = () => {
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(defaultImage); // Khởi tạo với ảnh mặc định

  const dispatch = useDispatch();

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
      // Tạo URL tạm thời để hiển thị ảnh
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedFile) {
        // Upload image and get URL
        const imageUrl = await uploadImageToFirebase(selectedFile);
        setProductData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      }

      // Dispatch the action to create the product with the image URL
      dispatch(createProduct(productData));
      console.log("Product data", productData);
    } catch (error) {
      console.error("Error creating product:", error);
      setError('Error creating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-secondary'>
      <Header />
      <Container component="main" maxWidth="md" className='bg-white rounded-md'>
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5, fontFamily: 'Poppins' }} className='pt-5'>
          Add New Product
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brandId"
                value={productData.brandId}
                onChange={handleChange}
                variant="outlined"
                sx={{ fontFamily: 'Poppins' }}
              />
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
                  value={productData.categoryId}
                  onChange={handleChange}
                  label="Category"
                  sx={{ fontFamily: 'Poppins' }}
                >
                  <MenuItem value="1">T-shirt</MenuItem>
                  <MenuItem value="2">Dress</MenuItem>
                  <MenuItem value="3">Pants</MenuItem>
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
                  <MenuItem value="Men">Men</MenuItem>
                  <MenuItem value="Women">Women</MenuItem>
                  <MenuItem value="Unisex">Unisex</MenuItem>
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
                    onChange={(event) => handleSizeChange(event, index)}
                    required
                    variant="outlined"
                    sx={{ fontFamily: 'Poppins' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={detail.quantity}
                    onChange={(event) => handleSizeChange(event, index)}
                    required
                    variant="outlined"
                    sx={{ fontFamily: 'Poppins' }}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid container justifyContent="flex-end" className='p-4 mt-8'>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  className='bg-primary p-2'
                  sx={{ fontFamily: 'Poppins' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Add New Product'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default CreateProductForm;
