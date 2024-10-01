const backEndDomain = "http://localhost:8000";
const SummaryApi = {
  singUp: {
    url: `${backEndDomain}/api/singup/`,
    method: "post",
  },
  singIn: {
    url: `${backEndDomain}/api/singin/`,
    method: "post",
  },
  current_user: {
    url: `${backEndDomain}/api/user-details/`,
    method: "get",
  },
  logout_user: {
    url: `${backEndDomain}/api/user-logout/`,
    method: "get",
  },
  all_user: {
    url: `${backEndDomain}/api/all-users/`,
    method: "get",
  },
  updateUser: {
    url: `${backEndDomain}/api/update-user/`,
    method: "post",
  },
  uploadProduct: {
    url: `${backEndDomain}/api/upload-product/`,
    method: "post",
  },
  allProduct: {
    url: `${backEndDomain}/api/get-product/`,
    method: "get",
  },
  updateProduct: {
    url: `${backEndDomain}/api/update-product/`,
    method: "post",
  },
  getCategoryProduct: {
    url: `${backEndDomain}/api/get-categoryProduct/`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backEndDomain}/api/category-product/`,
    method: "post",
  },
  productDetails: {
    url: `${backEndDomain}/api/product-details/`,
    method: "post",
  },
  addToCart: {
    url: `${backEndDomain}/api/add-to-cart/`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backEndDomain}/api/count-add-to-cart/`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backEndDomain}/api/add-to-cart-view/`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backEndDomain}/api/update-add-to-cart/`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backEndDomain}/api/delete-add-to-cart/`,
    method: "delete",
  },
  searchProduct: {
    url: `${backEndDomain}/api/search/`,
    method: "get",
  },
  filterProduct: {
    url: `${backEndDomain}/api/filter-product/`,
    method: "post",
  },
};

export default SummaryApi;
