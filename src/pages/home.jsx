import React from "react";
import Header from "../components/header";
import Iklan from "../components/iklan";
import Products from "../components/products";
import Troli from "../components/troli";

export default function Home() {
  return (
    <>
      <Troli />
      <section className="home-page">
        <Header />
        <Iklan />
        <Products />
      </section>
    </>
  );
}
