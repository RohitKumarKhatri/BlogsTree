'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import image1 from '@/assets/images/young-girl-reading.jpg';
import image2 from '@/assets/images/young-man-reading.jpg';

const images = [image1, image2];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[48rem] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}>
          <Image
            src={src}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority={index === currentIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
