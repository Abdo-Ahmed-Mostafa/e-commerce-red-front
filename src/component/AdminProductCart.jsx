import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProductCard from "./AdminEditProductCard";
import DisplayCurrency from "../helpers/DisplayCurrency";

const AdminProductCart = ({ product, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className="h-32  w-32 flex items-center justify-center">
          <img
            src={product?.productImage[0]}
            alt=""
            width={100}
            height={100}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{product?.productName}</h1>
        <div>
          <div>
            <DisplayCurrency num={product?.sellingPrice} />
          </div>
          <div
            className="w-fit  ml-auto p-2 hover:bg-green-500 hover:text-white rounded-full bg-green-100 cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProductCard
          product={product}
          onClose={() => setEditProduct(false)}
          fetchAllProduct={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCart;
