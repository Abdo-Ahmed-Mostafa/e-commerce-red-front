import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../../helpers/FetchCategoryWiseProduct";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const CategoryWiseProduct = ({ category, heading }) => {
  const { fetchCartProductCount } = useContext(Context);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetchCategoryWiseProduct(category);
    setData(response?.data);
    setLoading(false);
  };
  const handleAddToCart = async (e, productId) => {
    await addToCart(e, productId);
    fetchCartProductCount();
    console.log("CartProductCount");
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto xl:px-14 px-4 my-6 relative ">
      <h2 className="text-lg font-semibold py-2 capitalize">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,320px))] justify-between gap-4 items-center md:gap-6   ">
        {loading
          ? loadingList.map((item, index) => (
              <div
                key={index}
                className="w-full  bg-white rounded-sm shadow animate-pulse"
              >
                <div className="p-3  bg-slate-200 h-48 flex items-center justify-center "></div>
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
                to={`/product/${item._id}`}
                key={index}
                className="w-full  bg-white rounded-sm shadow "
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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

export default CategoryWiseProduct;
