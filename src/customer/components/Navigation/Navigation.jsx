import { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Avatar from '@mui/material/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import AuthModal from '../../Auth/AuthModal';
import { logout, getUser } from '../../../State/Auth/Action';
import { findProducts } from '../../../State/Product/Action';
import { Link } from 'react-router-dom';

const navigation = {
  pages: [
    { name: 'HOME', href: '/' },
    { name: 'PRODUCTS', href: '/products/getAll' },
    { name: 'ABOUT US', href: '' },
  ],
};

export default function Navigation() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // State to track which modal to show
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const { auth, cart } = useSelector(store => store);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const decodeQueryString = decodeURIComponent(location.search);
  const searchPramms = new URLSearchParams(decodeQueryString);

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  const handleGetAllProduct = () => {
    handleLoadProduct(); // Gọi hàm load sản phẩm trước
    navigate('/products/getAll'); // Sau đó chuyển hướng đến trang sản phẩm
  };

  const handleOpen = (modalType) => {
    navigate("/" + modalType)
    setAuthModalType(modalType);
    setOpenAuthModal(true);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  // useEffect(() => {
  //   console.log("Cart updated:", cart);

  // }, [cart]); 

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/")
  };

  return (
    <div className="bg-white z-50">
      {/* Mobile menu */}

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-26 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://i.pinimg.com/564x/cc/c0/7b/ccc07b76866532ee8632d4087e87eca1.jpg"
                    className="h-13 w-12"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="z-10 text-md uppercase -mb-px flex items-center border-b-2 border-transparent pt-px text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.data.user.username ? (
                    <div className="flex ">
                      <Avatar
                        className="text-white bg-primary"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{ color: "white", cursor: "pointer", background: "#c38b8b" }}
                      />
                      <div className="ml-3 flex items-center font-medium">
                        <span id='username'>{auth.user?.data.user.username}</span>
                      </div>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{ "aria-labelledby": "basic-button" }}
                      >
                        <MenuItem onClick={() => navigate('/account/profile')}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate('/account/order')}>My Orders</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={() => handleOpen('login')}
                        className="text-md text-gray-700 hover:text-gray-800"
                      >
                        SIGNIN
                      </Button>
                      <Button
                        onClick={() => handleOpen('register')}
                        className="text-md font-medium text-gray-700 hover:text-gray-800 ml-5"
                      >
                        SIGNUP
                      </Button>
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      onClick={() => navigate('/cart')}
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart?.cart?.data?.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} modalType={authModalType} />
    </div>
  );
}
