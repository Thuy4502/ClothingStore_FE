import React, { useEffect } from 'react'
import { findProducts, deleteProduct } from '../../State/Product/Action'
import { useDispatch, useSelector } from 'react-redux'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { HiPencil, HiPencilAlt } from 'react-icons/hi';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Move useNavigate to the top of the component
  const { products } = useSelector(store => store);
  console.log("product-----", products);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  }

  const decodeQueryString = decodeURIComponent(location.search);
  const searchPramms = new URLSearchParams(decodeQueryString);
  const colorValue = searchPramms.get("colors");
  const genderValue = searchPramms.get("gender");
  const sizeValue = searchPramms.get("sizes");
  const priceValue = searchPramms.get("price");
  const sortValue = searchPramms.get("sort");
  const pageNumber = searchPramms.get("page");
  const category = searchPramms.get("category");
  const productList = products?.products?.content || [];

  useEffect(() => {
    const page = pageNumber ? Math.max(0, Number(pageNumber)) : 0;

    const data = {
      category: "", 
      colors: [], 
      gender: "",
      sizes: [], 
      minPrice: 0,
      maxPrice: 100000000000000,
      sort: "price_low",
      pageNumber: Math.max(0, page - 1), 
      pageSize: 50
    };
    dispatch(findProducts(data));
  }, [dispatch, pageNumber, products.deletedProduct]); 

  return (
    <div>
      <Header />
      <div className='p-5 bg-secondary'>
        <Card className='mt-2'>
          <div className="flex justify-between items-center m-5">
            <CardHeader title="All Products" />
            <button
              onClick={() => navigate("/admin/products/add")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className='bg-primary text-white font-semibold'>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Product Id</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Image</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Product Name</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Price ($)</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Status</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Edit</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Update status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((item) => (
                  <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.productId}
                    </TableCell>
                    <TableCell align="left">
                      <Avatar src={item.image} />
                    </TableCell>
                    <TableCell align="left">{item.productName}</TableCell>
                    <TableCell align="left">${item.currentPrice}</TableCell>
                    <TableCell align="left">{item.status}</TableCell>
                    <TableCell align="left" onClick={() => navigate(`/admin/products/edit/${item.productId}`)}>
                      <HiPencilAlt />
                    </TableCell>

                    <TableCell align="left">
                      <Button onClick={() => handleDeleteProduct(item.productId)} variant="outlined"
                        sx={{ textTransform: 'none' }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
};

export default ProductsTable;
