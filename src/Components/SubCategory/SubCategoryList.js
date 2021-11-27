import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subCategory";

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showSubCategories = () =>
    subCategories && subCategories.length > 0
      ? subCategories.map((i) => (
          <div
            key={i._id}
            className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
          >
            <Link to={`/subcategory/${i.slug}`}>{i.subCategoryName}</Link>
          </div>
        ))
      : null;

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading... </h4>
        ) : (
          showSubCategories()
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
