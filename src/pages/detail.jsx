import React, { useEffect, useState } from "react";
import {
  getProducts,
  toggleTroli,
  toggleTroliOff,
  likeProduct,
  deleteProductInTroli,
  handleLikeState,
} from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Troli from "../components/troli";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likeState = useSelector((state) => state.products.likeState);
  const productDetail = useSelector((state) =>
    state.products.data.find((product) => product.id == id)
  );
  // console.log(productDetail);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (!productDetail) {
    return (
      <section className="detail-page">
        <p>Loading...</p>
      </section>
    );
  }

  const handleBackToHome = () => {
    dispatch(toggleTroliOff());
    window.history.replaceState(null, null, "/");
    navigate("/");
  };

  const handleLikeProduct = (productId) => {
    dispatch(handleLikeState(productId));
    if (!likeState[productId]) {
      dispatch(likeProduct(productId));
    } else if (likeState[productId]) {
      dispatch(deleteProductInTroli(productId));
    }
  };

  return (
    <>
      <Troli />
      <section className="detail-page">
        <div className="product-detail-area">
          <div className="img-area">
            <div
              className={
                likeState[productDetail.id]
                  ? "like-product-inDetail likeOn"
                  : "like-product-inDetail likeOff"
              }
              onClick={() => handleLikeProduct(productDetail.id)}
            >
              <i className="fa-regular fa-heart"></i>
            </div>
            <div
              className="troli-inDetail"
              onClick={() => dispatch(toggleTroli())}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <img src={productDetail.image} alt="" />
          </div>
          <div className="desc-area">
            <div onClick={handleBackToHome} className="back-to-home">
              <i className="fa-solid fa-arrow-left-long"></i>
              <p>Back to Home</p>
            </div>
            <div className="desc-detail">
              <p className="category-product-detail">
                {productDetail.category}
              </p>
              <p className="title-detail-product">{productDetail.title}</p>
              <div className="rate-area">
                <div className="star-rate">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                |
                <p>
                  {productDetail.rating.rate} ( {productDetail.rating.count}{" "}
                  review )
                </p>
              </div>
            </div>
            <p className="description-detail-product">
              {productDetail.description.length > 310
                ? `${productDetail.description.substring(0, 310)}...`
                : productDetail.description}
            </p>
          </div>
          <div className="fixed">
            <div className="price-detail-area">
              <div className="preview-area">
                <div className="img-detail">
                  <img src={productDetail.image} alt="" />
                </div>
                <div className="pre-desc-product">
                  <p className="pre-title-product">
                    {" "}
                    {productDetail.title.length > 30
                      ? `${productDetail.title.substring(0, 30)}...`
                      : productDetail.title}
                  </p>
                  <p className="pre-description-product">
                    {productDetail.description.length > 50
                      ? `${productDetail.description.substring(0, 50)}...`
                      : productDetail.description}
                  </p>
                </div>
              </div>
              <div className="pre-price-product">${productDetail.price}</div>
              <button className="pre-add-troli">
                Check Out <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
