import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { Typography, Grid, TextField, InputLabel, FormControl, Select, MenuItem, Button, Container } from '@mui/material';
import Header from './Header';

const initialSizes = [
  { size: "S", quantity: 0 },
  { size: "M", quantity: 0 },
  { size: "L", quantity: 0 },
  { size: "XL", quantity: 0 },
];

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

  console.log("Ma nhan vien", localStorage.getItem("staffId"));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    console.log("Product data", productData);
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={productData.image}
                onChange={handleChange}
                variant="outlined"
                sx={{fontFamily: 'Poppins' }}
                InputProps={{
                  style: { fontFamily: 'Poppins' }, 
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brandId"
                value={productData.brandId}
                onChange={handleChange}
                variant="outlined"
                sx={{fontFamily: 'Poppins' }}
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
                sx={{fontFamily: 'Poppins' }}
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
                sx={{fontFamily: 'Poppins' }}
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
                sx={{fontFamily: 'Poppins' }}
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
                  sx={{fontFamily: 'Poppins' }}
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
                  sx={{fontFamily: 'Poppins' }}
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
                sx={{fontFamily: 'Poppins' }}
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
                    sx={{fontFamily: 'Poppins' }}


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
                    sx={{fontFamily: 'Poppins' }}
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
                  sx={{fontFamily: 'Poppins' }}
                >
                  Add New Product
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
