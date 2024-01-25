import axios from "axios";
export const addProduct = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/addproducts",
      formData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admintoken"),

          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchProductDataadmin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/admin/fetchProduct",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admintoken"),
        },
      }
    );

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
