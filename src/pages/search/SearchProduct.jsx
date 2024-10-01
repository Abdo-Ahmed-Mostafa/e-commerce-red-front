import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../../common";
import CategoryWiseProduct from "../../component/product/CategoryWiseProduct";
import VerticalCard from "../../component/product/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProductSearch = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const data = await response.json();
    setData(data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProductSearch();
  }, [query]);
  return (
    <div className="container mx-auto px-4 xl:px-16 min-h-[calc(100vh-135px)]">
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <>
          <p className="text-lg font-semibold my-3">
            Product Search Result : {data.length}
          </p>
          {data.length === 0 && !loading && (
            <p className="text-center text-lg bg-white p-4">No product found</p>
          )}
          {data.length !== 0 && !loading && (
            <div className="">
              <VerticalCard data={data} loading={loading} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchProduct;
