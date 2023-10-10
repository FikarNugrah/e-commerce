import React, { useEffect } from "react";
import { getProducts } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Iklan() {
  const products = useSelector((state) => state.products.data);
  const dispatch = useDispatch();
  const product = products.find((dataProduct) => dataProduct.id === 14);
  // console.log(product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="iklan-area">
      <div className="iklan">
        <p>AYOO!! Lihat Product Yang Tersedia !!</p>
        {product ? <img src={product.image} alt="" /> : <p>...</p>}
      </div>
    </section>
  );
}
