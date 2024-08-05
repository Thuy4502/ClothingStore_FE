import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPromotion } from '../../State/Promotion/Action';
import { useNavigate } from 'react-router-dom';

const PromotionList = () => {
  const { promotions } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function
  const [promotionList, setPromotionList] = useState([]);

  useEffect(() => {
    dispatch(getAllPromotion());
  }, [dispatch]);

  useEffect(() => {
    if (promotions) {
      setPromotionList(promotions);
    }
  }, [promotions]);

  console.log("Promotion store", promotions);

  useEffect(() => {
    setPromotionList(promotions || []); // Ensure promotions is an array
  }, [promotions]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Promotions</h2>
      <div className="flex justify-end mr-10">
        <button
          onClick={() => navigate("/admin/promotion/add")} // Use navigate for routing
          className="mb-4 flex justify-end bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Promotion
        </button>
      </div>
      <table className="w-full">
        <thead className="bg-primary">
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Promotion Value (%)</th>
            <th className="py-2">Start Date</th>
            <th className="py-2">End Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.promotions.length > 0 ? (
            promotions.promotions.map((item) => (
              <tr key={item.promotionId} className="border-b">
                <td className="py-2 text-center">{item.promotionId}</td>
                <td className="py-2 text-center">{item.promotionName}</td>
                <td className="py-2 text-center">{item.discountValue}</td>
                <td className="py-2 text-center">{item.startDate}</td>
                <td className="py-2 text-center">{item.endDate}</td>
                <td className="py-2 text-center">
                  <Switch
                    checked={item.status === 'Active'}
                    // onChange={() => handleStatusChange(item.promotionId, item.status)}
                    className={`${item.status === 'Active' ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
                  >
                    <span
                      className={`${item.status === 'Active' ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </td>
                <td className="py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-2 text-center">No promotions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionList;
