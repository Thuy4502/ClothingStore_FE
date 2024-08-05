import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Header from './Header';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.adminOrder);

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, index) => {
    setAnchorEl((prev) => ({
      ...prev,
      [index]: event.currentTarget
    }));
  };

  const handleClose = (index) => {
    setAnchorEl((prev) => ({
      ...prev,
      [index]: null
    }));
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  console.log("Orders data: ", orders); // Debugging

  const handleShipedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    console.log("Handle ship order", orderId)
    handleClose();
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    console.log("Handle confirm order", orderId)
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    console.log("Handle deliver order", orderId)
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };

  return (
    <div>
      <Header />
      <div className='p-5 bg-secondary'>
        <Card className='m-3'>
          <CardHeader title='All Orders' />
          <TableContainer component={Paper} className='m-2'sx={{fontFamily: 'Poppins' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow className='bg-primary text-white font-semibold'>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}}>Order ID</TableCell>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}} align="left">Order date</TableCell>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}} align="left">Total Item</TableCell>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}} align="left">Total price</TableCell>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}} align="left">Status</TableCell>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}} align="left">Update Status</TableCell>
                  <TableCell style={{ color: 'white' , fontWeight: 'bold'}} align="left">Action</TableCell>
                </TableRow>

              </TableHead>
              <TableBody>
                {Array.isArray(orders) && orders.map((item, index) => (
                  <TableRow
                    key={item.orderId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.orderId}
                    </TableCell>
                    <TableCell align="left">{item.orderDate}</TableCell>
                    <TableCell align="left">{item.totalItem}</TableCell>
                    <TableCell align="left">{item.totalAmount}</TableCell>
                    <TableCell align="left">
                      <span className={`text-white px-2 py-2 rounded-full
                      ${item.status === 'CONFIRMED' ? "bg-green-500" :
                          item.status === 'SHIPPED' ? "bg-gray-500" :
                            item.status === 'PENDING' ? 'bg-gray-300' :
                              item.status === 'PLACED' ? "bg-blue-500" :
                                "bg-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        id={`status-button-${item.orderId}`}
                        aria-controls={anchorEl[index] ? 'status-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorEl[index])}
                        onClick={(event) => handleClick(event, index)}
                      >
                        Status
                      </Button>
                      <Menu
                        id={`status-menu-${item.orderId}`}
                        anchorEl={anchorEl[index]}
                        open={Boolean(anchorEl[index])}
                        onClose={() => handleClose(index)}
                        MenuListProps={{
                          'aria-labelledby': `status-button-${item.orderId}`,
                        }}
                      >
                        <MenuItem onClick={() => handleConfirmedOrder(item.orderId)}>Confirmed Order</MenuItem>
                        <MenuItem onClick={() => handleShipedOrder(item.orderId)}>Shipped Order</MenuItem>
                        <MenuItem onClick={() => handleDeliveredOrder(item.orderId)}>Delivered Order</MenuItem>
                      </Menu>
                    </TableCell>
                    <TableCell align="left">
                      <Button onClick={() => handleDeleteOrder(item.orderId)}
                        variant="outlined" sx={{ textTransform: 'none' }}
                        aria-controls={`status-menu-${item.orderId}`}
                        aria-expanded={Boolean(anchorEl[index])}
                      >
                        Delete
                      </Button>
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

export default OrdersTable;
