import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Products from "./pages/products/Products";
import AddProduct from "./pages/add-product/AddProduct";
import EditProduct from "./pages/edit-product/EditProduct";

const App: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Wrapper */}
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
