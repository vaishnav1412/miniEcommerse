import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RouteObjects } from "../../Routes/RouteObjests";

const LoginAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));

    setErrorMessage((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const loginsubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = {};
      if (!formData.email) {
        errors.email = "Enter email";
      }
      if (!formData.password) {
        errors.password = "Enter Password";
      }
      if (!Object.values(errors).every((value) => value === "")) {
        setErrorMessage(errors);
        return;
      } else {
        const response = await axios.post(
          "http://localhost:5000/admin/adminLogin",
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("admintoken", response.data.data);
          navigate(RouteObjects.AdminHome);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-500' >
      <div className=" flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Admin</h1>
        </div>
        <form onSubmit={loginsubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label for="email" className="block mb-2 text-sm">Email address</label>
              <input
                onChange={handleInputChange}
                type="email" name="email" id="email" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
              {errorMessage.email && (
                <p className="text-red-500 text-md">{errorMessage.email}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">Password</label>
              </div>
              <input
                onChange={handleInputChange} type="password" name="password" id="password" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
              {errorMessage.password && (
                <p className="text-red-500 text-md">{errorMessage.password}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Sign in</button>
            </div>


          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginAdmin