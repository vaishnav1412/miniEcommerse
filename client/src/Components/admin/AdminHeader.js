import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteObjects } from "../../Routes/RouteObjests";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <nav class="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
          <div class="flex justify-between p-4">
            <div class="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
              <Link to={RouteObjects.AdminHome}>Admin</Link>
            </div>
            <div class="flex items-center space-x-4 text-lg font-semibold tracking-tight">
              <button
                class="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={() => {
                  localStorage.removeItem("admintoken");
                  navigate(RouteObjects.AdminLogin);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default AdminHeader;
