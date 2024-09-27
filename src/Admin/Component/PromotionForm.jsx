import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPromotion } from '../../State/Promotion/Action';
import Header from './Header';

const PromotionForm = () => {
  const dispatch = useDispatch();

  // State for promotion data
  const [promotionData, setPromotionData] = useState({
    promotionName: "",
    discountValue: 0,
    startDate: "",
    endDate: "",
    type: "", // Added state for promotion type
    value_min: "", // Added state for minimum quantity
    value_max: ""  // Added state for maximum quantity
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPromotion(promotionData));
    console.log("Promotion data..... ", promotionData);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotionData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Header />
      <div className="p-6 bg-white rounded-lg shadow-md m-20">
        <h2 className="text-2xl font-bold mb-4">Add Promotion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Promotion Name</label>
            <input
              type="text"
              name="promotionName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Example: New Arrival Discount"
              value={promotionData.promotionName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Promotion Type</label>
            <select
              name="promotionType"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={promotionData.promotionType}
              onChange={handleInputChange}
            >
              <option value="">Select Promotion Type</option>
              <option value="percent">Percent</option>
              <option value="2tinhtien1">Buy 2 Pay for 1</option>
              <option value="3tinhtien2">Buy 3 Pay for 2</option>
            </select>
          </div>

          {promotionData.promotionType === 'percent' && (
            <div className="mb-4">
              <label className="block text-gray-700">Discount Value (%)</label>
              <input
                type="number"
                name="discountValue"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={promotionData.discountValue}
                onChange={handleInputChange}
                placeholder="Enter discount percentage"
              />
            </div>
          )}

          {(promotionData.promotionType === '2tinhtien1' || promotionData.promotionType === '3tinhtien2') && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Minimum Quantity</label>
                <input
                  type="number"
                  name="value_min"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={promotionData.minQuantity}
                  onChange={handleInputChange}
                  placeholder="Enter minimum quantity"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Maximum Quantity</label>
                <input
                  type="number"
                  name="value_max"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={promotionData.maxQuantity}
                  onChange={handleInputChange}
                  placeholder="Enter maximum quantity"
                />
              </div>
            </>
          )}

          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700">Valid from</label>
              <input
                type="date"
                name="startDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={promotionData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Valid until</label>
              <input
                type="date"
                name="endDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={promotionData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PromotionForm;
