import React, { useContext, useEffect, useRef, useState } from "react";
import SummaryApi from "../../common";
import fetchCategoryWiseProduct from "../../helpers/FetchCategoryWiseProduct";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const HorizontalCardProduct = ({ category, heading }) => {
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
        className="flex gap-4 items-center md:gap-6 overflow-x-auto  scrollbar-none scrollLeft transition-all duration-500  "
        ref={scrollElement}
      >
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
        {loading
          ? loadingList.map((item, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex  "
              >
                <div className="p-3  min-w-[120px] md:min-w-[145px] bg-slate-200 h-full animate-pulse "></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="md:text-lg font-medium text-base text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full "></h2>
                  <p className="capitalize  text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-2 w-full">
                    <p className="text-red-600 font-medium p-1 bg-slate-200 animate-pulse rounded-full w-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 animate-pulse rounded-full w-full"></p>
                  </div>
                  <button className=" text-white px-3 py-1  text-sm w-full bg-slate-200 animate-pulse p-1 rounded-full"></button>
                </div>
              </div>
            ))
          : data.map((item, index) => (
              <Link
                to={`product/${item._id}`}
                key={index}
                className="w-full  h-36 bg-white rounded-sm shadow flex  "
              >
                <div className="p-3  min-w-[120px] md:min-w-[145px] bg-slate-200 h-full ">
                  <img
                    src={item.productImage[0]}
                    alt=""
                    className="h-full object-scale-down hover:scale-110 transition-all duration-300 mix-blend-multiply "
                  />
                </div>
                <div className="p-4 grid">
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
                    onClick={(e) => handleAddToCart(e, item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
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

export default HorizontalCardProduct;
