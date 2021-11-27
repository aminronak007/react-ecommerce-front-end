import React, { useState, useEffect } from "react";
import { listProducts, getProductsCount } from "../../functions/product";
import ProductCard1 from "../ProductCards/ProductCard1";
import LoadingCard from "../LoadingCard/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data.total);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    listProducts("sold", "desc", page).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => {
              return (
                <div key={product._id} className="col-lg-4 col-md-6 col-sm-12">
                  <ProductCard1 product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
