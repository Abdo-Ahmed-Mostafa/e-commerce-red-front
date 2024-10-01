import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import imageMobile from "../assest/banner/img1_mobile.jpg";
import imageMobile2 from "../assest/banner/img2_mobile.webp";
import imageMobile3 from "../assest/banner/img3_mobile.jpg";
import imageMobile4 from "../assest/banner/img4_mobile.jpg";
import imageMobile5 from "../assest/banner/img5_mobile.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImage = [image1, image2, image3, image4, image5];
  const mobileImage = [
    imageMobile,
    imageMobile2,
    imageMobile3,
    imageMobile4,
    imageMobile5,
  ];
  const nextImage = () => {
    setCurrentImage(currentImage + 1);
    if (currentImage === desktopImage.length - 1) {
      setCurrentImage(0);
    }
  };
  const prevImage = () => {
    setCurrentImage(currentImage - 1);
    if (currentImage === 0) {
      setCurrentImage(desktopImage.length - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto xl:px-14 px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between  w-full text-2xl">
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1 "
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop image */}
        <div className="  md:flex h-full w-full overflow-auto scrollbar-none hidden ">
          {desktopImage.map((item, index) => (
            <div key={index} className="w-full h-full min-w-full  min-h-full  ">
              <img
                src={item}
                alt=""
                className="w-full h-full  rounded-xl transition-all duration-500 "
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              />
            </div>
          ))}
        </div>
        {/* mobile image */}
        <div className="flex h-full w-full overflow-auto scrollbar-none md:hidden">
          {mobileImage.map((item, index) => (
            <div key={index} className="w-full h-full min-w-full  min-h-full  ">
              <img
                src={item}
                alt=""
                className="w-full h-full  rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
