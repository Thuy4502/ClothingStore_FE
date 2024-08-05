import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPromotion, getAllPromotion } from '../../State/Promotion/Action';
import { useSelector } from 'react-redux';

const PromotionForm = () => {

  const dispatch = useDispatch();
  const [promotionData, setPromotionData] = useState({
    promotionName: "",
    discountValue: 0,
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPromotion(promotionData));
    console.log("Promotion data..... ", promotionData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotionData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
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
        <div className="mb-4">
          <label className="block text-gray-700">Discount value percent (%)</label>
          <input
            type="number"
            name="discountValue"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={promotionData.discountValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-2">Active</label>
          <input
            type="checkbox"
            name="isActive"
            className="form-checkbox"
            checked={promotionData.isActive || false}
            onChange={(e) => setPromotionData(prevState => ({
              ...prevState,
              isActive: e.target.checked
            }))}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
      </form>
    </div>
  );
};



export default PromotionForm;
