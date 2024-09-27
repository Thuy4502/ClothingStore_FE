import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByCategory } from '../../State/Product/Action';
import { addPromotionItem } from '../../State/Promotion/Action';
import { Avatar } from '@mui/material';

const SelectProducts = () => {
  const { promotionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const allProducts = useSelector((store) => store.products?.products?.content ?? []);

  useEffect(() => {
    dispatch(getProductByCategory());
  }, [dispatch]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) => {
      const updatedSelected = prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId];
      console.log('Updated selected products:', updatedSelected);
      return updatedSelected;
    });
  };

  // Convert promotionId to a number
  const numericPromotionId = Number(promotionId);

  const reqData = {
    productId: selectedProducts,
    promotionId: numericPromotionId
  };

  const handleSave = () => {
    console.log('Request data:', reqData); // Kiểm tra dữ liệu gửi đi
    dispatch(addPromotionItem(reqData));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select Products for Promotion</h2>
      <table className="w-full">
        <thead className="bg-primary">
          <tr>
            <th className="py-2">Select</th>
            <th className="py-2">Product ID</th>
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.productId)}
                    onChange={() => handleProductSelect(product.productId)}
                  />
                </td>
                <td className="py-2 text-center">{product.productId}</td>
                <td className="py-2 text-center">
                  <Avatar src={product.image} />
                </td>
                <td className="py-2 text-left">{product.productName}</td>
                <td className="py-2 text-left">{product.currentPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default SelectProducts;
