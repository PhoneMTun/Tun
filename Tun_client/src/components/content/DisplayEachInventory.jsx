import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import '../../App.css';

export default function DisplayEachInventory({ item, onClose }) {
  const [imageUrls, setImageUrls] = useState([]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inventory/${item.id}`);
        const fetchedImageUrls = response.data.image_url.split(',').map(filename => 
          `../../../public/product_pictures/${response.data.sku}/${filename}`
        );
        setImageUrls(fetchedImageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (item) {
      fetchImages();
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-blue p-6 rounded-lg shadow-xl max-w-4xl w-full border border-gray-200 bg-opacity-95 backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-extrabold text-white mb-4">{item.name}</h2>
        <div className="flex flex-wrap justify-between">
          <div className="grid grid-cols-1 gap-4 mb-4 w-full md:w-1/2 text-white">
            <p className="text-lg"><strong>SKU:</strong> {item.sku}</p>
            <p className="text-lg"><strong>Price:</strong> {formatPrice(item.prices)} MMK</p>
            <p className="text-lg"><strong>Quantity:</strong> {item.quantity}</p>
            <p className="text-lg"><strong>Quantity Per Pack:</strong> {item.quantity_per_packet}</p>
            <p className="text-lg"><strong>Total Packs:</strong> {Math.floor(item.quantity / item.quantity_per_packet)}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 w-full md:w-1/2 text-white">
            <p className="text-lg"><strong>Made in:</strong> {item.type}</p>
            <p className="text-lg"><strong>Location:</strong> {item.warehouse.location}</p>
            <p className="text-lg"><strong>Listed By:</strong> {item.userdata.first_name}</p>
            <p className="text-lg"><strong>Created at:</strong> {formatDate(item.created_at)}</p>
          </div>
        </div>

        {imageUrls.length > 0 && (
          <div className="mb-6">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={url} alt={`${item.name}-${index}`} className="w-full large-image object-cover object-center rounded-md"/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <button onClick={onClose} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Close
        </button>
      </div>
    </div>
  );
}
