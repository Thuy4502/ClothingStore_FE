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
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder, cancelOrder } from '../../State/Admin/Order/Action';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Header from './Header';
import { format } from 'date-fns';
import OrderDetails from '../../customer/components/Order/OrderDetails';
import { Navigate, useNavigate } from 'react-router-dom';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.adminOrder);
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleShipedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    handleClose();
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };

  const handleOpenDetailModal = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetailModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <Header />
      <div className='p-5 bg-secondary'>
        <Card className='m-3'>
          <CardHeader title='All Orders' />
          <TableContainer component={Paper} className='m-2' sx={{ fontFamily: 'Poppins' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className='bg-primary text-white font-semibold'>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Order date</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Total Item</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Total price</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Status</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Update Status</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Action</TableCell>
                  <TableCell style={{ color: 'white', fontWeight: 'bold' }} align="left">Detail</TableCell> {/* New column for details */}
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
                    <TableCell align="left">{format(new Date(item.orderDate), 'yyyy-MM-dd')}</TableCell>
                    <TableCell align="left">{item.totalItem}</TableCell>
                    <TableCell align="left">${item.totalAmount}</TableCell>
                    <TableCell align="left">
                      <span className={`text-white px-2 py-2 rounded-full
                      ${item.status === 'CONFIRMED' ? "bg-green-500" :
                          item.status === 'SHIPPED' ? "bg-gray-500" : 
                            item.status === 'PENDING' ? 'bg-yellow-300' : 
                              item.status === 'PLACED' ? "bg-blue-400" : 
                                item.status === 'DELIVERED' ? "bg-blue-600" : 
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
                        disabled={item.status === 'DELIVERED'}
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
                        <MenuItem
                          onClick={() => handleConfirmedOrder(item.orderId)}
                          disabled={item.status === 'DELIVERED'}
                        >
                          Confirmed Order
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleShipedOrder(item.orderId)}
                          disabled={item.status === 'DELIVERED'}
                        >
                          Shipped Order
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeliveredOrder(item.orderId)}
                          disabled={item.status === 'DELIVERED'}
                        >
                          Delivered Order
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleCancelOrder(item.orderId)}
                          disabled={item.status === 'DELIVERED'}
                        >
                          Cancelled Order
                        </MenuItem>
                      </Menu>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleDeleteOrder(item.orderId)}
                        variant="outlined"
                        sx={{
                          textTransform: 'none',
                          color: 'red',
                          borderColor: 'red',
                          '&:hover': {
                            borderColor: 'darkred',
                            backgroundColor: 'lightcoral'
                          }
                        }}
                        aria-controls={`status-menu-${item.orderId}`}
                        aria-expanded={Boolean(anchorEl[index])}
                      >
                        Delete
                      </Button>
                    </TableCell>

                    <TableCell align="left">
                      <Button
                        onClick={() => navigate(`/admin/orders/detail/${item.orderId}`)}
                        variant="contained"
                        color="primary"
                        className='bg-primary'
                        sx={{ textTransform: 'none' }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>

      {/* Modal for order details */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default OrdersTable;
