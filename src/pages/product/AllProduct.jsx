import React, { useEffect, useState } from "react";
import UploadProduct from "../../component/product/UploadProduct";
import SummaryApi from "../../common";
import AdminProductCart from "../../component/AdminProductCart";

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>

        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 transition-all hover:text-white py-1 px-3 rounded-full"
        >
          Upload Product
        </button>
      </div>

      {/* allProduct */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => (
          <AdminProductCart
            key={index + "allProduct"}
            product={product}
            fetchData={fetchAllProduct}
          />
        ))}
      </div>

      {/* upload product content */}
      {openUploadProduct && (
        <UploadProduct
          fetchAllProduct={fetchAllProduct}
          onClose={() => setOpenUploadProduct(false)}
        />
      )}
    </div>
  );
};

export default AllProduct;
