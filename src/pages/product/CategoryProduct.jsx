import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../../helpers/ProductCategory";
import VerticalCard from "../../component/product/VerticalCard";
import SummaryApi from "../../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCategoryListInArray = searchParams.getAll("category");
  const urlCategoryListInObject = {};
  urlCategoryListInArray.forEach((category) => {
    urlCategoryListInObject[category] = true;
  });
  const [sortBy, setSortBy] = useState("");
  const handleSortBy = (e) => {
    const { value } = e?.target;
    if (value === "asc") {
      setData((prev) => {
        return prev.sort((a, b) => a.sellingPrice - b.sellingPrice);
      });
      setSortBy("asc");
    } else if (value === "dsc") {
      setData((prev) => {
        return prev.sort((a, b) => b.sellingPrice - a.sellingPrice);
      });
      setSortBy("dsc");
    }
  };

  useEffect(() => {}, [sortBy]);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectedCategory((prev) => {
      return { ...prev, [value]: checked };
    });
  };
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectedCategory)
      .map((category) => {
        if (selectedCategory[category]) {
          return category;
        }
        return null;
      })
      .filter((el) => el !== null);
    setFilterCategoryList(arrayOfCategory);
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length === 1) === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate(`/product-category?${urlFormat.join("")}`);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 xl:px-16 mt-4">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr] gap-7">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-auto">
          {/* sort by */}

          <div className="">
            <h3 className="text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="asc"
                  checked={sortBy === "asc"}
                  onChange={handleSortBy}
                />
                <label htmlFor="latest">Price - Low To High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  onChange={handleSortBy}
                  checked={sortBy === "dsc"}
                />
                <label htmlFor="latest">Price - High To Low</label>
              </div>
            </form>
          </div>
          {/*filter by  */}
          <div className="">
            <h3 className="text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    id={categoryName.value}
                    value={categoryName.value}
                    checked={!!selectedCategory[categoryName?.value]}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>
                    {categoryName.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* right side */}
        <div className="">
          <p className="font-medium text-slate-800 text-lg my-2">
            {" "}
            Search Result : {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
