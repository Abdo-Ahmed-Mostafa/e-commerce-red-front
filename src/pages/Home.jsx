import React from "react";
import CategoryList from "../component/product/CategoryList";
import BannerProduct from "../component/BannerProduct";
import HorizontalCardProduct from "../component/product/HorizontalCardProduct";
import VerticalCardProduct from "../component/product/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's AirPodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"popular's Watches"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & photography"}
      />
      <VerticalCardProduct category={"earPhones"} heading={"Wired Earphones"} />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
};

export default Home;
