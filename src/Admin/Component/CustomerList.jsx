import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../State/Admin/Customer/Action';
import { Switch } from '@mui/material'; // Import Switch from MUI
import Header from './Header';

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((store) => store.customers || {});

  console.log("Khách hàng:", customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading customers: {error.message}</p>;

  return (
    <div>
      <Header/>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Customers</h2>

        <table className="w-full bg-white border rounded-md shadow-md">
          <thead className="bg-primary text-black">
            <tr>
              <th className="py-2 px-4">Customer ID</th>
              <th className="py-2 px-4">Customer Name</th>
              <th className="py-2 px-4">Phone Number</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.data?.length > 0 ? (
              customers.data.map((customer) => (
                <tr key={customer.customerId} className="border-b">
                  <td className="py-2 px-4 text-left">{customer.customerId}</td>
                  <td className="py-2 px-4 text-left">{customer.firstName} {customer.lastName}</td>
                  <td className="py-2 px-4 text-left">{customer.phoneNumber}</td>
                  <td className="py-2 px-4 text-left">{customer.email}</td>
                  <td className="py-2 px-4 text-left">{customer.address}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 text-center">No customers available</td> {/* Adjust colSpan to 6 */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default CustomerTable;
