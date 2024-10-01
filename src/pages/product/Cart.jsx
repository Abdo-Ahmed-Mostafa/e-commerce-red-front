import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../../common";
import Context from "../../context";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { CartProductCount } = useContext(Context);
  const loadingCart = new Array(CartProductCount).fill(null);
  const { fetchCartProductCount } = useContext(Context);

  const fetchData = async () => {
    const res = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setData(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const incrementQty = async (productId, quantity) => {
    const res = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity + 1, _id: productId }),
    });
    const data = await res.json();

    if (data.success) {
      fetchData();
    }
  };
  const decrementQty = async (productId, quantity) => {
    if (quantity === 2) {
      return;
    }

    const res = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity - 1, _id: productId }),
    });
    const data = await res.json();
    if (data.success) {
      fetchData();
    }
  };
  const deleteProduct = async (productId) => {
    const res = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: productId }),
    });
    const data = await res.json();
    if (data.success) {
      fetchData();
      fetchCartProductCount();
    }
  };
  const totalQuantity = data.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = data.reduce(
    (acc, curr) => acc + curr.productId.sellingPrice * curr.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 xl:px-16 min-h-[calc(100vh-120px)]">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <div className="bg-white py-5">
            <p>No data</p>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View product */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingCart.map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              ></div>
            ))
          ) : (
            <div>
              {data.map((product, index) => (
                <div
                  key={index}
                  className="w-full bg-white h-36 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-full bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product.productId?.productName}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      onClick={() => deleteProduct(product._id)}
                      className="absolute right-0 m-1 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize font-medium text-lg">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {DisplayCurrency({
                          num: product?.productId?.sellingPrice,
                        })}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {DisplayCurrency({
                          num:
                            product?.productId?.sellingPrice *
                            product?.quantity,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          decrementQty(product._id, product.quantity)
                        }
                        className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded  w-6 h-6 flex justify-center items-center"
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        onClick={() =>
                          incrementQty(product._id, product.quantity)
                        }
                        className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded  w-6 h-6 flex justify-center items-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse rounded"></div>
          ) : (
            <div className="h-36 bg-white rounded flex flex-col justify-between">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{DisplayCurrency({ num: totalPrice })}</p>
              </div>
              <button className="bg-blue-600 p-2 text-white w-full">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
