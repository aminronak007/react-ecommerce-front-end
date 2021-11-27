import React from "react";
import Jumbotron from "../../../Components/Jumbotron/Jumbotron";
import NewArrivals from "../../../Components/Home/NewArrivals";
import BestSellers from "../../../Components/Home/BestSellers";

const Products = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h6 className="text-center p-2 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h6>

      <NewArrivals />

      <h6 className="text-center p-2 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h6>
      <BestSellers />
    </>
  );
};

export default Products;
