import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTroliOff,
  deleteProductInTroli,
  updateLikeStateOnProductDelete,
} from "../slices/productSlice";

export default function Troli() {
  const dispatch = useDispatch();
  const troli = useSelector((state) => state.products.troliSlide);
  const productsInTroli = useSelector(
    (state) => state.products.productsInTroli
  );

  function handleDeleteProductInTroli(id) {
    dispatch(deleteProductInTroli(id));
    dispatch(updateLikeStateOnProductDelete(id));
  }

  return (
    <>
      {productsInTroli && productsInTroli.length > 0 ? (
        <section className={troli ? "troli-component on" : "troli-component"}>
          <div className="off-troli">
            <div onClick={() => dispatch(toggleTroliOff())} className="off-btn">
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="troli-area">
            {productsInTroli.map((product) => (
              <div key={product.id} className="product-inTroli-area">
                <div
                  className="deleteProduct-inTroli"
                  onClick={() => handleDeleteProductInTroli(product.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </div>
                <div className="card-product-inTroli">
                  <div className="img-product-inTroli">
                    <img src={product.image} alt="" />
                  </div>
                  <div className="desc-product-inTroli">
                    <p className="title-product-inTroli">
                      {product.title.length > 23
                        ? `${product.title.substring(0, 23)}...`
                        : product.title}
                    </p>
                    <div className="price-area">
                      <p
                        style={{
                          textDecoration: "line-through",
                          color: "#c2bfbf",
                        }}
                        className="price-product-inTroli"
                      >
                        ${product.price}
                      </p>

                      <p className="price-product-inTroli">
                        ${(product.price * 0.9).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section
          style={{ alignItems: "center", justifyContent: "center" }}
          className={troli ? "troli-component on " : "troli-component"}
        >
          <div className="off-troli">
            <div onClick={() => dispatch(toggleTroliOff())} className="off-btn">
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p>you don't have a product you like</p>
          </div>
        </section>
      )}
    </>
  );
}
