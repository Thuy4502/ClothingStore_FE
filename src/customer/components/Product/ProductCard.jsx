import React, { useEffect, useState } from 'react';
import "./ProductCard.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getActivePromotions } from '../../../State/Promotion/Action';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { promotions } = useSelector(store => store);
  const [discountValue, setDiscountValue] = useState(product.currentPrice);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promotionData, setPromotionData] = useState(null);

  useEffect(() => {
    dispatch(getActivePromotions());
  }, [dispatch]);

  useEffect(() => {
    if (promotions && promotions.activePromotions && Array.isArray(promotions.activePromotions.data)) {
      const activePromotions = promotions.activePromotions.data;

      const currentPromotion = activePromotions.find(promo =>
        promo.productPromotions.some(p => p.product_id === product.productId)
      );

      if (currentPromotion) {
        setPromotionData({
          name: currentPromotion.promotionName,
          value_max: currentPromotion.value_max,
          value_min: currentPromotion.value_min,
          status: currentPromotion.status,
          type: currentPromotion.type
        });
        setDiscountValue(product.currentPrice - currentPromotion.discountValue);
      } else {
        setPromotionData(null);
        setDiscountValue(product.currentPrice);
        setDiscountPercent(0);
      }
    }
  }, [promotions, product]);

  const handleClick = () => {
    navigate(`/product/${product.productId}`, {
      state: {
        product,
        promotion: promotionData
      }
    });
  };

  return (
    <div onClick={handleClick} className='productCard w-[15rem] m-3 transition-all cursor-pointer'>
      <div className='h-[20rem]'>
        <img className='h-full w-full object-cover object-left-top' src={product.image} alt='' />
      </div>

      <div className='textPart bg-white p-3 text-left'>
        <div>
          <p className='font-bold opacity-60'>{product.productName}</p>
          <p>{product.imageAlt}</p>
          {/* Hiển thị tên khuyến mãi */}
          {promotionData && <p className='text-green-500 font-semibold'>{promotionData.name}</p>}
        </div>
        <div className='flex items-center space-x-2'>
          <p className='font-bold'>${discountValue.toFixed(2)}</p>
          {promotionData && discountPercent > 0 && (
            <p className='text-green-600 font-semibold'>{discountPercent.toFixed(0)}% off</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
