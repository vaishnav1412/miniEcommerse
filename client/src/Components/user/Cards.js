import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { addtocart, fetchProductData } from "./userUtil/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import SearchBar from "./Search";
import { hideloading, showloading } from "../../Redux/alertSlice";
import { useDispatch } from "react-redux";
const Cards = () => {
  const dispatch = useDispatch();

  const [products, setproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])

  const addToCart = async (prodcutId) => {
    try {
      const response = await addtocart(prodcutId);
      response.data.success
        ? Swal.fire({
          position: "center",
          icon: "success",
          title: "Added To Cart",
          showConfirmButton: false,
          timer: 1500,
        })
        : toast.error(response.data.message);
    } catch (error) {
      toast.error("something went wrong in catch");
    }
  };
  const getProducts = async () => {
    try {
      dispatch(showloading());

      const response = await fetchProductData();
      dispatch(hideloading());

      if (response.data.success) {
        setproducts(response.data.data);
        setFilteredProducts(response.data.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());

      toast.error("something went wrong catch");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>


      <SearchBar products={products} setFilteredProducts={setFilteredProducts} />

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 xl:gap-1 mt-2">
        {filteredProducts?.map((data, index) => (
          <Card
            className="max-w-sm  "
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc={data?.image}
          >
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {data?.name}
                <br />
                {data?.description}
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${data?.price}
              </span>
              <a
                href="#"
                className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                onClick={() => addToCart(data?._id)}
              >
                Add to cart
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
