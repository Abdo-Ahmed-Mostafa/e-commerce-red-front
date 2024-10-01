import React, { useContext, useEffect, useRef, useState } from "react";
import SummaryApi from "../../common";
import fetchCategoryWiseProduct from "../../helpers/FetchCategoryWiseProduct";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const VerticalCardProduct = ({ category, heading }) => {
  const { fetchCartProductCount } = useContext(Context);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollElement = useRef();
  const loadingList = new Array(13).fill(null);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetchCategoryWiseProduct(category);
    setData(response?.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollRight = () => {
    const currentScroll = scrollElement.current.scrollLeft;
    scrollElement.current.scrollTo({
      left: currentScroll + 378,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const currentScroll = scrollElement.current.scrollLeft;
    scrollElement.current.scrollTo({
      left: currentScroll - 378,
      behavior: "smooth",
    });
  };
  const handleAddToCart = async (e, productId) => {
    await addToCart(e, productId);
    fetchCartProductCount();
    
  };
  return (
    <div className="container mx-auto xl:px-14 px-4 my-6 relative ">
      <h2 className="text-lg font-semibold py-2 capitalize">{heading}</h2>
      <div
        className="flex gap-4 items-center md:gap-6 overflow-x-scroll scrollbar-none scrollLeft transition-all duration-500  "
        ref={scrollElement}
      >
        <div className="flex justify-between  w-full text-2xl ">
          <button
            className="bg-white shadow-md rounded-full p-1 absolute xl:left-12 lg:left-0 text-lg hidden md:block  "
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white shadow-md rounded-full p-1 absolute xl:right-7 lg:right-9 text-lg hidden md:block  "
            onClick={scrollRight}
          >
            <FaAngleRight />
          </button>
        </div>
        {loading
          ? loadingList.map((item, index) => (
              <div
                key={index}
                className="w-full  bg-white rounded-sm shadow animate-pulse"
              >
                <div className="p-3  min-w-[230px] md:min-w-[250px] max-w-[230px] md:max-w-[250px]  bg-slate-200 h-48 flex items-center justify-center "></div>
                <div className="p-4 grid gap-3">
                  <h2 className="md:text-lg font-medium text-base text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-2 rounded-full "></h2>
                  <p className="capitalize  text-slate-500 bg-slate-200 animate-pulse p-2 rounded-full  w-full"></p>
                  <div className="flex gap-2">
                    <p className=" font-medium  bg-slate-200 animate-pulse p-2 rounded-full  w-full"></p>
                    <p className="text-slate-500 line-through  bg-slate-200 animate-pulse p-2 rounded-full  w-full"></p>
                  </div>
                  <button className=" text-white px-3 py-2  text-sm bg-slate-200 animate-pulse p-2 rounded-full  w-full"></button>
                </div>
              </div>
            ))
          : data.map((item, index) => (
              <Link
                to={`product/${item._id}`}
                key={index}
                className="w-full  bg-white rounded-sm shadow "
              >
                <div className="p-3  min-w-[280px] md:min-w-[145px] bg-slate-200 h-48 flex items-center justify-center ">
                  <img
                    src={item.productImage[0]}
                    alt=""
                    className="h-full object-scale-down hover:scale-110 transition-all duration-300 mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="md:text-lg font-medium text-base text-ellipsis line-clamp-1 text-black ">
                    {item.productName}
                  </h2>
                  <p className="capitalize  text-slate-500">{item.category}</p>
                  <div className="flex gap-2">
                    <p className="text-red-600 font-medium">
                      {DisplayCurrency({ num: item?.sellingPrice })}
                    </p>
                    <p className="text-slate-500 line-through">
                      {DisplayCurrency({ num: item?.price })}
                    </p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
                    onClick={(e) => handleAddToCart(e, item?._id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
