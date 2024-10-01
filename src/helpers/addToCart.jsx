import { toast } from "react-toastify";
import SummaryApi from "../common";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const response = await fetch(SummaryApi.addToCart.url, {
    method: SummaryApi.addToCart.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
  const data = await response.json();
  if (data?.success) {
    toast.success(data.massage);
  }
  if (data?.error) {
    toast.error(data?.massage);
    
  }
  
};

export default addToCart;
