import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getProductsCategories,
  toggle,
  toFalse,
  switchProductComponent,
  switchProduct,
  toggleTroli,
} from "../slices/productSlice";

export default function Header() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  // console.log(categories);
  const toggleCate = useSelector((state) => state.products.toggleCate);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function chooseCategories(category) {
    dispatch(toFalse());
    dispatch(switchProductComponent());
    dispatch(getProductsCategories(category));
    // console.log(category);
  }

  const switchComponent = (event) => {
    dispatch(toFalse());
    dispatch(switchProduct());
  };

  function handleTroli() {
    dispatch(toggleTroli());
    dispatch(toFalse());
  }

  return (
    <section className="header">
      <h1>LOGO</h1>
      <div className="right-header">
        <div className="src-area">
          <div className="search-column">
            <input
              onClick={() => alert("Maaf, fitur ini belum tersedia")}
              type="text"
              placeholder="Search Product"
            />
            <div
              className="select-categories"
              onClick={() => dispatch(toggle())}
            >
              <i
                className={
                  toggleCate ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
                }
              ></i>
            </div>
            <div className={toggleCate ? "category-list on" : "category-list"}>
              <p onClick={switchComponent}>All Products</p>
              {categories &&
                categories.map((category, index) => (
                  <p onClick={() => chooseCategories(category)} key={index}>
                    {category}
                  </p>
                ))}
            </div>
          </div>
          <div className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="header-fiture">
          <div className="account">
            <i className="fa-regular fa-user"></i>
          </div>
          <div className="troli" onClick={() => handleTroli()}>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
