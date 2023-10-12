import React, { useEffect } from "react";
import {
  getProducts,
  getProductsCategories,
  likeProduct,
  toggleTroliOff,
  deleteProductInTroli,
  handleLikeState,
} from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toFalse } from "../slices/productSlice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likeState = useSelector((state) => state.products.likeState);
  const productsComponent = useSelector(
    (state) => state.products.productsComponent
  );
  const products = productsComponent
    ? useSelector((state) => state.products.dataFromCategory)
    : useSelector((state) => state.products.data);

  useEffect(() => {
    if (!productsComponent) {
      dispatch(getProducts());
    } else {
      dispatch(getProductsCategories());
    }
  }, [dispatch]);

  function handleDetailProduct(id) {
    dispatch(toFalse());
    dispatch(toggleTroliOff());
    navigate(`/e-commerce/detail/${id}`);
  }

  const handleLikeProduct = (productId) => {
    dispatch(handleLikeState(productId));
    dispatch(likeProduct(productId));
    if (likeState[productId]) {
      dispatch(deleteProductInTroli(productId));
    }
  };

  return (
    <section className="products-area">
      {products && products.length > 0 ? (
        products.map((product) => (
          // PRODUCTS 1

          <div key={product.id} className="card-products">
            <div
              onClick={() => handleLikeProduct(product.id)}
              className={
                likeState[product.id] ? "like-product heartOn" : "like-product"
              }
            >
              <i className="fa-regular fa-heart"></i>
            </div>
            <div
              onClick={() => handleDetailProduct(product.id)}
              className="img-products"
            >
              {product.image ? (
                <img src={product.image} alt="" />
              ) : (
                <p style={{ color: "black" }}>...</p>
              )}
            </div>
            <div className="desc-products">
              <p title={product.title} className="title">
                {product.title.length > 19
                  ? `${product.title.substring(0, 19)}...`
                  : product.title}
              </p>
              <p className="categories">{product.category}</p>
              <p className="rate">
                <i className="fa-solid fa-star"></i>
                <span style={{ height: "19px" }}>
                  {product.rating.rate}
                </span>{" "}
                <span className="or">|</span>{" "}
                <span className="count">{product.rating.count} Rv</span>
              </p>
              <div className="price-area">
                <p
                  style={{ textDecoration: "line-through", color: "black" }}
                  className="price"
                >
                  ${product.price}
                </p>
                <p className="price">${(product.price * 0.9).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>...</p>
      )}
    </section>
  );
}

// // PRODUCTS 2

// <div key={product.id} className="card-products">
//   <div
//     onClick={() => handleLikeProduct(product.id)}
//     className={
//       likeState[product.id] ? "like-product heartOn" : "like-product"
//     }
//   >
//     <i className="fa-regular fa-heart"></i>
//   </div>
//   <div
//     onClick={() => handleDetailProduct(product.id)}
//     className="img-products"
//   >
//     {product.images ? (
//       <img src={product.images[1]} alt="" />
//     ) : (
//       <p style={{ color: "black", textAlign: "center" }}>...</p>
//     )}
//   </div>
//   <div className="desc-products">
//     <p title={product.title} className="title">
//       {product.title.length > 19
//         ? `${product.title.substring(0, 19)}...`
//         : product.title}
//     </p>
//     <p className="categories">{product.category.name}</p>
//     <p className="rate">
//       <i className="fa-solid fa-star"></i>
//       <span className="count">... Rv</span>
//     </p>
//     <div className="price-area">
//       <p
//         style={{ textDecoration: "line-through", color: "#c2bfbf" }}
//         className="price"
//       >
//         ${product.price}
//       </p>
//       <p className="price">${(product.price * 0.9).toFixed(2)}</p>
//     </div>
//   </div>
// </div>
