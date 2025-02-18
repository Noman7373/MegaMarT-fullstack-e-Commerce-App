import axios from "axios";
import Axios from "../Axios";
import { baseURL } from "../apiSummery.js";

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/user/register`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const userLogIn = async ({ email, password }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/user/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const userForgotPassword = async ({ email }) => {
  try {
    const response = await Axios.put(`${baseURL}/api/user/forgot-password`, {
      email,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const verifyOTP = async ({ otp, email }) => {
  try {
    const response = await Axios.put(
      `${baseURL}/api/user/verify-forgotpassword-otp`,
      {
        otp,
        email,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

const resetPassword = async ({ id, newPassword, confirmNewPassword }) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/user/reset-password/${id}`,
      {
        id,
        newPassword,
        confirmNewPassword,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// logout Function
const logOutUser = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/user/logout`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// expend the life of accessToken with the help of RefreshToken
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.put(`${baseURL}/api/user/refresh-token`, {
      refreshToken,
    });
    const accessToken = response.data.tokens.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// fetch User Details API
const getUserLoginDetails = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/user/getuser-details`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// Upload Avater
const updloadAvater = async ({ file }) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await Axios.put(
      `${baseURL}/api/user/upload-avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensures the file is uploaded correctly
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error during avatar upload:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during avatar upload."
    );
  }
};

// update USER Details
const updateUserDetails = async ({ _id, name, email, mobie }) => {
  try {
    const response = await Axios.put(
      `${baseURL}/api/user/update-profile/${_id}`,
      {
        _id,
        name,
        email,
        mobie,
      }
    );

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

// =============================  Products AXIOS  ====================================

// Function to add a category via Axios
const addCategoryAxios = async ({ name, image }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/category/add-category`, {
      name,
      image,
    });

    return response; // Return the successful response
  } catch (error) {
    // Throw a detailed error message
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get Category Axios
const getCategoryAxios = async () => {
  try {
    const response = await Axios.get(`${baseURL}/api/category/get-category`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Update Category Axios
const updateCategoryAxios = async ({ id, name, image }) => {
  try {
    const response = await Axios.put(
      `${baseURL}/api/category/update-category/${id}`,
      {
        id,
        name,
        image,
      }
    );

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Delete Category Axios
const deleteCategoryAxios = async ({ _id }) => {
  try {
    const response = await Axios.delete(
      `${baseURL}/api/category/category-delete`,
      { data: { _id } }
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Add SubCategory Axios
const addSubCategoryAxios = async ({ name, image, category }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/add-Subcategory`, {
      name,
      image,
      category,
    });

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Add SubCategory Axios
const getSubCategoryAxios = async () => {
  try {
    const response = await Axios.post(`${baseURL}/api/get-subcategories`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Add SubCategory Axios
const updateSubcategoryAxios = async ({ _id, name, image, category }) => {
  try {
    const response = await Axios.put(`${baseURL}/update-subcategories/${_id}`, {
      name,
      image,
      category,
    });

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Delete SubCategory Axios
const deleteSubcategoryAxios = async ({ _id }) => {
  try {
    const response = await Axios.delete(`${baseURL}/api/delete-subcategory`, {
      data: { _id },
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Add Product Axios
const addProductAxios = async ({
  name,
  image,
  description,
  category,
  subCategory,
  unit,
  stock,
  price,
  discount,
  more_details,
}) => {
  try {
    const response = await Axios.post(`${baseURL}/api/product`, {
      name,
      image,
      description,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      more_details,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get all Product
const getAllProductAxios = async ({ page, limit, search }) => {
  try {
    const response = Axios.post(`${baseURL}/api/product/all`, {
      page,
      limit,
      search,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get-Product-By-Category and Category
const getProductByCategoryAxios = async ({ id }) => {
  try {
    const respone = await Axios.post(`${baseURL}/api/product/by-category`, {
      id,
    });
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get-Product-By-Category and Category
const getProductByCategorySubcategoryAxios = async ({
  categoryId,
  subCategoryId,
}) => {
  try {
    const respone = await Axios.post(
      `${baseURL}/api/product/by-category&subcategory`,
      {
        categoryId,
        subCategoryId,
      }
    );
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get-Product-Details
const getProductDetailAxios = async ({ id }) => {
  try {
    const respone = await Axios.get(`${baseURL}/api/product/details/${id}`);
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Update Product Axios
const updateProductAxios = async ({
  _id,
  name,
  image,
  description,
  category,
  subCategory,
  unit,
  stock,
  price,
  discount,
  more_details,
}) => {
  try {
    const response = await Axios.put(`${baseURL}/api/product-update`, {
      _id,
      name,
      image,
      description,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      more_details,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Delete Product Axios
const deleteProductAxios = async ({ _id }) => {
  try {
    const response = await Axios.delete(`${baseURL}/api/product-delete`, {
      data: { _id },
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Search Product Axios
const searchProductAxios = async ({ search }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/product-search`, {
      search,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// create cart items Axios
const createCartAxios = async ({ productId, userId }) => {
  try {
    const response = await Axios.post(`${baseURL}/api/create/cart`, {
      productId,
      userId,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get Cart items Axios
const getCartItemsAxios = async () => {
  try {
    const response = Axios.get(`${baseURL}/api/get-cart`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Update Cart Quantity
const updateCartItemsQuantityAxios = async ({ _id, quantity }) => {
  try {
    const response = await Axios.put(`${baseURL}/api/update/cart`, {
      _id,
      quantity,
    });

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

//  Remove Cart-Items
const removeCartItemsAxios = async ({ _id }) => {
  try {
    const response = await Axios.delete(`${baseURL}/api/delete/cart`, {
      data: { _id },
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// create UserAddress Axios
const createUserAddress = async ({
  userId,
  address_line,
  city,
  state,
  pincode,
  country,
  mobile,
}) => {
  try {
    const response = await Axios.post(`${baseURL}/api/create/address`, {
      userId,
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the category"
    );
  }
};

// Get User Address Axios
const getUserAddress = async (_id) => {
  try {
    const response = await Axios.get(`${baseURL}/api/get/address`, {
      params: { _id },
    });
    return response.data; // Return the data payload
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching the address"
    );
  }
};

const deleteUserAddressAxios = async (_id) => {
  try {
    const response = await Axios.delete(`${baseURL}/api/delete/address`, {
      data: { _id }, // Pass the payload in the `data` property
    });
    return response.data; // Return the response payload
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the address"
    );
  }
};

// Update userAddress Axios
const updateAddressAxios = async ({
  _id,
  address_line,
  city,
  state,
  pincode,
  country,
  mobile,
}) => {
  try {
    const respone = await Axios.put(`${baseURL}/api/update/address`, {
      _id,
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
    });
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the address"
    );
  }
};

//cashPaymentClient Axios
const cashPaymentClientAxios = async ({
  itemsList,
  totalAmount,
  delivery_address_Id,
  subTotalAmount,
}) => {
  try {
    const response = Axios.post(`${baseURL}/api/payments/cash`, {
      itemsList,
      totalAmount,
      delivery_address_Id,
      subTotalAmount,
    });

    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the address"
    );
  }
};

// Get Order History
const fetchOrderHistoryAxios = async () => {
  try {
    const response = Axios.get(`${baseURL}/api/orders/history`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the address"
    );
  }
};

// Stripe_Payment_Axios
const StripePaymentAxios = async ({
  itemsList,
  totalAmount,
  delivery_address_Id,
  subTotalAmount,
}) => {
  console.log("Request Data:", {
    itemsList,
    totalAmount,
    delivery_address_Id,
    subTotalAmount,
  });

  try {
    const response = await Axios.post(`${baseURL}/api/checkout`, {
      itemsList,
      totalAmount,
      delivery_address_Id,
      subTotalAmount,
    });
    return response;
  } catch (error) {
    console.error(
      "Error during Stripe payment:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while processing the payment"
    );
  }
};

// Get Order Details_Axios
const getStripeOrderDetailsAxios = async (_id) => {
  try {
    const respose = Axios.get(`${baseURL}/api/order/details`, {
      _id,
    });
    return respose;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while processing the payment"
    );
  }
};
export {
  registerUser,
  userLogIn,
  userForgotPassword,
  verifyOTP,
  resetPassword,
  logOutUser,
  refreshAccessToken,
  getUserLoginDetails,
  updloadAvater,
  updateUserDetails,
  // Category
  addCategoryAxios,
  getCategoryAxios,
  updateCategoryAxios,
  deleteCategoryAxios,
  // SubCategory
  addSubCategoryAxios,
  getSubCategoryAxios,
  updateSubcategoryAxios,
  deleteSubcategoryAxios,
  // Product
  addProductAxios,
  getAllProductAxios,
  getProductByCategoryAxios, // Get product by category
  getProductByCategorySubcategoryAxios, // Get product by category and Subcategory
  getProductDetailAxios,
  updateProductAxios,
  deleteProductAxios,
  searchProductAxios,
  // Cart Items
  createCartAxios,
  getCartItemsAxios,
  updateCartItemsQuantityAxios,
  removeCartItemsAxios,
  // Address Axios
  createUserAddress,
  getUserAddress,
  deleteUserAddressAxios,
  updateAddressAxios,
  // Order-By-Cash
  cashPaymentClientAxios,
  fetchOrderHistoryAxios,
  // Stripe
  StripePaymentAxios,
  // GetOrder Details Axios
  getStripeOrderDetailsAxios,
};
