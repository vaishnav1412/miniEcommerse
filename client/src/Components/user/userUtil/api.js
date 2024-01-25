import axios from "axios";
export const fetchProductData = async () => {
  try {
    const response = await axios.post("http://localhost:5000/user/fetchProduct", {}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};


export const addtocart = async (productId) => {
  try {
    const response = await axios.post("http://localhost:5000/user/addtocart", { productId: productId }
      , {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchCartData = async () => {
  try {
    const response = await axios.post("http://localhost:5000/user/fetchcartdata", {}
      , {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteItems = async (productId) => {
  try {
    const response = await axios.post("http://localhost:5000/user/cartitemdelete", { productId: productId }
      , {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const placetheOrder = async (orderData) => {
  try {
    const response = await axios.post("http://localhost:5000/user/placeorder", orderData
      , {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};


export const orderpayment = async (payment, order, id) => {
  try {

    const response = axios.post("http://localhost:5000/user/payment", { payment: payment, order: order, id: id }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),

      }
    })
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
}


export const cartDecrement = async (productId) => {
  try {
    const response = axios.post("http://localhost:5000/user/decrement", {id:productId }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),

      }
      });

    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};



export const cartIncrement = async (productId) => {
  try {

    const response = axios.post("http://localhost:5000/user/increment", { id:productId }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),

      }
    })
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
}
