import React from "react";
import DealsOfDay from "../DealsOfDay/DealsOfDay";
import Banner from "../Carousel/Banner";
import Products from "../Products/Products";
import CategoryList from "../../../Components/Category/CategoryList";
import SubCategoryList from "../../../Components/SubCategory/SubCategoryList";

const Home = () => {
  return (
    <>
      <Banner />
      <DealsOfDay />
      <Products />
      <h6 className="text-center p-2 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h6>
      <CategoryList />
      <h6 className="text-center p-2 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h6>
      <SubCategoryList />
    </>
  );
};
export default Home;
