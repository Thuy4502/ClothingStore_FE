import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] h-[20rem] mx-3'>
      <div className='h-[13rem] w-[10rem]'>
        <img className='object-cover object-top w-full h-full' src={product.image} alt={product.productName} />
      </div>
      <div className='p-4 flex-1 flex flex-col justify-between'>
        <h3 className='text-lg font-medium text-gray-900'>{product.productName}</h3>
        <p className='mt-2 text-sm text-gray-500'>${product.currentPrice}</p>
      </div>
    </div>
  );
}

export default HomeSectionCard;
