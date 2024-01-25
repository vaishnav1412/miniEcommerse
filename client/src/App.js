// import React from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRouts";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
