import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Routes, useNavigate, Route } from 'react-router-dom';
import {
  Box, ListItemButton, ListItemIcon, List, ListItem, Drawer,
  CssBaseline, ListItemText
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dashboard from './Component/Dashboard';
import ProductsTable from './Component/ProductList';
import OrdersTable from './Component/OrderList';
import CustomerTable from './Component/CustomerList';
import CreateProductForm from './Component/ProductForm';
import PromotionForm from './Component/PromotionForm';
import {
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiOutlineCube,
  HiOutlineUserGroup,
  HiOutlineServer,
  HiOutlineReceiptTax,
  HiOutlineCog,
  HiTicket,
  HiOutlineBadgeCheck,
  HiBriefcase,
  HiOutlineTag
}
  from "react-icons/hi";
import PromotionList from './Component/PromotionList';

const menu = [
  { name: "Dashboard", path: "/admin", icon: <HiOutlineViewGrid /> },
  { name: "Products", path: "/admin/products", icon: <HiOutlineCube /> },
  { name: "Orders", path: "/admin/orders", icon: <HiOutlineShoppingCart /> },
  { name: "Brand", path: "/admin/brands", icon: <HiBriefcase /> },
  { name: "Category", path: "/admin/category", icon: <HiOutlineTag/> },
  // { name: "AddProduct", path: "/admin/product/add", icon: <HiOutlineCube /> },
  { name: "Customer", path: "/admin/customers", icon: <HiOutlineUserGroup /> },
  { name: "Promotion", path: "/admin/promotion", icon: <HiTicket /> }
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <div className="bg-primary flex flex-col h-full ">
      <aside id="cta-button-sidebar" className="  pl-5 pt-5 fixed top-0 left-0 z-40 w-64 h-screen dark:bg-gray-800" aria-label="Sidebar">
        <div className="flex flex-col h-full">
          <div className="flex-grow px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {menu.map((item, index) => (
                <li key={index}>
                  <div onClick={() => navigate(item.path)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    {/* SVG Icon */}
                    <span className="ms-3 text-white">{item.icon}</span>
                    <span className="ms-3 text-white">{item.name}</span>

                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto px-3 py-4">
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign out</span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </aside>
    </div>
  );

  return (
    <div className="relative flex h-full">
      <CssBaseline />
      <div className='w-[15%] shadow-lg bg-white rounded-lg h-[100vh] fixed top-0 left-0'>
        {drawer}
      </div>
      <div className='w-[85%] shadow-lg bg-white rounded-lg pb-10 ml-[15%] font-sans'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<ProductsTable />} />
          <Route path='/orders' element={<OrdersTable />} />
          <Route path='/create' element={<CreateProductForm />} />
          <Route path='/customers' element={<CustomerTable />} />
          <Route path='/promotion' element={<PromotionList />} />
          <Route path='/promotion/add' element={<PromotionForm />} />
          <Route path='/products/add' element={<CreateProductForm />} />
        </Routes>

      </div>
    </div>
  );
}

export default Admin;
