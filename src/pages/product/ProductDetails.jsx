import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import CategoryWiseProduct from "../../component/product/CategoryWiseProduct";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchCartProductCount } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const productImageIsLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const fetchProductDetails = async () => {
    setLoading(true);
    const res = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const dataResponse = await res.json();
    setData(dataResponse.data);
    
    setActiveImage(dataResponse.data?.productImage[0]);
    setLoading(false);
  };
  const handleMouseEnterProduct = (image) => {
    setActiveImage(image);
  };
  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.pageX - left) / width;
      const y = (e.pageY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    [zoomImageCoordinate]
  );
  const handleLeaveZoomImage = () => {
    setZoomImage(false);
  };
  const handleAddToCart = async (e, productId) => {
    await addToCart(e, productId);
    fetchCartProductCount();
    navigate("/cart");
  };
  return (
    <div className="container mx-auto xl:px-16 p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 ">
          <div className="w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt="product-image"
              className="h-full object-scale-down mix-blend-multiply w-full cursor-pointer"
              onMouseMove={(e) => handleZoomImage(e)}
              onMouseLeave={handleLeaveZoomImage}
            />
            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] overflow-hidden bg-slate-200 p-1 top-0 -right-[410px]">
                <div
                  className="w-full h-full min-h-[400px] min-w-[400px]  mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageIsLoading.map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((item, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 bg-slate-200 rounded p-1 cursor-pointer`}
                  >
                    <img
                      src={item}
                      alt={`product-image-${index}`}
                      loading="lazy"
                      onMouseEnter={() => handleMouseEnterProduct(item)}
                      onClick={() => handleMouseEnterProduct(item)}
                      className={`h-full object-scale-down w-full mix-blend-multiply`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full  rounded-full inline-block  "></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 rounded-full  bg-slate-200 animate-pulse"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 animate-pulse min-w-[100px] h-6 lg:h-8 rounded-full"></p>
            <div className="text-red-600 flex items-center gap-2 bg-slate-200 animate-pulse h-6 rounded-full"></div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium text-red-600  rounded-full animate-pulse h-6">
              <p className="bg-slate-200"></p>
              <p className="text-slate-400 line-through bg-slate-200"></p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full w-full border border-slate-200"></button>
              <button className="bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full w-full border border-slate-200"></button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1 bg-slate-200 animate-pulse h-6 rounded-full"></p>
              <p className="bg-slate-200 animate-pulse h-6 rounded-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-red-600 flex items-center gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium text-red-600 my-2">
              <p>{DisplayCurrency({ num: data?.sellingPrice })}</p>
              <p className="text-slate-400 line-through">
                {DisplayCurrency({ num: data?.price })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-all duration-300">
                Buy
              </button>
              <button
                onClick={(e) => handleAddToCart(e, data?._id)}
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  font-medium bg-red-600 text-white hover:bg-white hover:text-red-600 transition-all duration-300"
              >
                Add to cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data?.category && (
        <div>
          <CategoryWiseProduct
            category={data?.category}
            heading={`Recommended ${data?.category}s`}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
