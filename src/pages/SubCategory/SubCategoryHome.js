import React, { useEffect, useState } from "react";
import { getSubCategory } from "../../functions/subCategory";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import ProductCard from "../../Components/ProductCards/ProductCard1";

const SubCategoryHome = () => {
  const { slug } = useParams();
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
      console.log(res);
      setSubCategory(res.data.subCategory);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {loading ? (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Loading...
              </h4>
            ) : (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                {products.length} Products in {subCategory.subCategoryName}
                &nbsp;Sub Category
              </h4>
            )}
          </div>
        </div>

        <div className="row">
          {products.map((i) => (
            <div key={i._id} className="col-lg-4 px-5 pb-5">
              <ProductCard product={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategoryHome;
