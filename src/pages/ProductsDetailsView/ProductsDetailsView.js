import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct, productStar } from "../../functions/product";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";
import Header from "../../Components/Header/Header";
import Cookies from "js-cookie";
import axios from "axios";
import { getRelated } from "../../functions/product";
import ProductCard from "../../Components/ProductCards/ProductCard1";

const ProductsDetailsView = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;
  const { slug } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [id, setId] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000", {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        setUserEmail(res.data.email);
        setId(res.data.id);
      });
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && token) {
      let existingRatingsObject = product.ratings.find(
        (element) => element.postedBy.toString() === id.toString()
      );
      existingRatingsObject && setStar(existingRatingsObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data.product);
      // load related products

      getRelated(res.data.product._id).then((res) =>
        setRelatedProducts(res.data.related)
      );
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, userEmail).then((res) =>
      console.log("rating", res)
    );
    loadSingleProduct(); // If you want to show updated rating in real time
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        </div>
        <div className="row p-3">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Related Products</h4>
            <hr />
          </div>
        </div>
        <div className="row pb-5">
          {relatedProducts.length ? (
            relatedProducts.map((r) => (
              <div key={r._id} className="col-lg-4 col-md-6 col-sm-12 px-5">
                <ProductCard product={r} />
              </div>
            ))
          ) : (
            <div className="text-center col"> No Products Found</div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductsDetailsView;
