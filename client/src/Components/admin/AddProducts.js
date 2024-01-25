import React, { useState } from "react";
import { addProduct } from "./adminUtil/api";
import toast from "react-hot-toast";
import axios from "axios";
import { productFormValidation } from "./adminUtil/validation";
const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    price: "",
    description: "",
    image: null,

  })
  const handleInputchange = (event) => {
    const { name, value } = event.target;

    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));


    setErrorMessages((pre) => ({
      ...pre,
      [name]: ""
    }))
  };
  const handleInputchangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((preData) => ({
        ...preData,
        image: file,
      }));
    }

  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = productFormValidation(formData)

      if (!Object.values(errors).every((value) => value === "")) {
        setErrorMessages(errors);
        return;
      } else {
        const response = await addProduct(formData)


        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
            name: "",
            price: "",
            description: "",
            image: null,
          });
        } else {
          toast.error(response.data.message);
        }


      }
    } catch (error) {
      toast.error("somthing went wrong in catch");
      console.log(error);
    }

  };

  return (


    <div className="pt-24 ">
      <div className=" ">
        <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold flex justify-between">

            <span className="font-normal">Add Product Here</span>
            <span>X</span>
          </h1>
          <form onSubmit={formSubmit} className="mt-6">
            <div className="flex justify-between gap-3">
              <span className="w-1/2">
                <label
                  for="name"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Products Name"
                  onChange={handleInputchange}
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded-sm focus:outline-none focus:bg-gray-300 focus:shadow-inner"

                />
                {errorMessages.name && (
                  <p className="text-red-500 text-md">{errorMessages.name}</p>
                )}
              </span>
              <span className="w-1/2">
                <label
                  for="price"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Products Price"
                  onChange={handleInputchange}
                  autocomplete="family-name"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded-sm focus:outline-none focus:bg-gray-300 focus:shadow-inner"

                />
                {errorMessages.price && (
                  <p className="text-red-500 text-md">{errorMessages.price}</p>
                )}
              </span>
            </div>

            <label
              for="description"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Details
            </label>
            <textarea
              id="description"
              type="description"
              name="description"
              onChange={handleInputchange}
              placeholder="Products Details..."
              autocomplete="description"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded-sm focus:outline-none focus:bg-gray-300 focus:shadow-inner"

            />
            {errorMessages.description && (
              <p className="text-red-500 text-md">{errorMessages.description}</p>
            )}

            <label
              for="image"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase "
            >
              Add Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              autocomplete="image"
              onChange={handleInputchangeImage}
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none rounded-xl  focus:bg-gray-300 focus:shadow-inner"

            />
            {errorMessages.image && (
              <p className="text-red-500 text-md">{errorMessages.image}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-violet-800 rounded-xl shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AddProducts;
