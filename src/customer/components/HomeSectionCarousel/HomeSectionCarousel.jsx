import React, { useState } from 'react'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@headlessui/react';


const HomeSectionCarousel = ({data, sectionName}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4 },
  };

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1)

  const syncActiveIndex = ({item}) => setActiveIndex(item)

  const items = data.map((item) => <HomeSectionCard key={item.id} product={item} />);

  return (
    <div className="relative px-4 lg:px-8 border shadow mb-5 rounded">
      <h3 className='font-extrabold mt-3 text-2xl text-gray-800'>{sectionName}</h3>
      <div className="relative justify-center p-5 flex">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex} // Pass the syncActiveIndex function
          activeIndex={activeIndex}
        />
      </div>
    </div>
  )
}

export default HomeSectionCarousel
