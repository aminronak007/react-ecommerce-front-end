import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((i) => (
      <div
        key={i._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/category/${i.slug}`}>{i.categoryName}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading... </h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
