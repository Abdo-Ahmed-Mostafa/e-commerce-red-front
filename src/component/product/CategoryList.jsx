import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);
  const fetchCategory = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getCategoryProduct.url);
    const data = await response.json();
    setLoading(false);
    setCategory(data.data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="container mx-auto p-4 xl:px-14 ">
      <div className="flex items-center justify-between gap-4 overflow-x-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((item, index) => (
              <div
                key={index}
                className="h-16 w-16 max-w-20 max-h-20 rounded-full bg-slate-200 overflow-hidden animate-pulse"
              ></div>
            ))
          : category.map((item, index) => (
              <Link
                to={"/product-category?category=" + item?.category}
                key={index}
                className=" cursor-pointer"
              >
                <div className="md:h-16 md:w-16 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  <img
                    src={item?.productImage[0]}
                    alt={item.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all duration-300"
                  />
                </div>
                <p className="text-center text-sm font-semibold md:text-base capitalize ">
                  {item.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
