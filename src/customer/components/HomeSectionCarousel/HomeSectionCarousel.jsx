import React, { useEffect, useState, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { findProducts, getProductByCategory } from '../../../State/Product/Action';
import ProductCard from '../Product/ProductCard';

const HomeSectionCarousel = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  useEffect(() => {
    dispatch(getProductByCategory());

  }, [ dispatch]);

  useEffect(() => {
    if (products?.content) {
      const shuffled = [...products.content].sort(() => Math.random() - 0.5);
      setShuffledProducts(shuffled);
    }
  }, [products]);

  const items = shuffledProducts.map((item) => <ProductCard key={item.id} product={item} />) || [];

  return (
    <div className="relative px-4 lg:px-8 border shadow mb-5 rounded p-10">
      <h3 className='font-extrabold mb-10  text-center text-2xl text-gray-800'>OUR PRODUCTS</h3>
      <div className="relative justify-center p-5 flex">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <AliceCarousel
            items={items}
            responsive={responsive}
            disableDotsControls
          />
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
