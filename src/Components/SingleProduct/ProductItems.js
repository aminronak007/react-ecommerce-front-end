import React from "react";
import { Link } from "react-router-dom";

const ProductItems = ({ product }) => {
  const {
    price,
    category,
    subCategory,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <div className="list-group">
      <li className="list-group-item">
        Price&nbsp;:
        <span className="label label-default label-pill pull-xs-right">
          &nbsp;INR {price}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category&nbsp;:
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            &nbsp;{category.categoryName}
          </Link>
        </li>
      )}

      {subCategory && (
        <li className="list-group-item">
          Sub Category&nbsp;:
          {subCategory.map((s) => {
            return (
              <Link
                key={s._id}
                to={`/subcategory/${s.slug}`}
                className="label label-default label-pill pull-xs-right"
              >
                &nbsp;{s.subCategoryName}
              </Link>
            );
          })}
        </li>
      )}

      <li className="list-group-item">
        Shipping&nbsp;:
        <span className="label label-default label-pill pull-xs-right">
          &nbsp;{shipping}
        </span>
      </li>
      <li className="list-group-item">
        Color&nbsp;:
        <span className="label label-default label-pill pull-xs-right">
          &nbsp;{color}
        </span>
      </li>
      <li className="list-group-item">
        Brand&nbsp;:
        <span className="label label-default label-pill pull-xs-right">
          &nbsp;{brand}
        </span>
      </li>
      <li className="list-group-item">
        Available&nbsp;:
        <span className="label label-default label-pill pull-xs-right">
          &nbsp;{quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold&nbsp;:
        <span className="label label-default label-pill pull-xs-right">
          &nbsp;{sold}
        </span>
      </li>
    </div>
  );
};

export default ProductItems;
