import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../../functions/user";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { url } from "../../config";
import axios from "axios";
import Cookies from "js-cookie";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({});
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      });
  });

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const loadWishlist = () =>
    getWishlist(user).then((res) => {
      console.log("www", res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeFromWishlist(productId, user).then((res) => {
      loadWishlist();
    });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col p-3 ">
          <h4>Wishlist</h4>

          {wishlist && wishlist.length > 0
            ? wishlist.map((p) => (
                <div key={p._id} className="alert alert-secondary">
                  {console.log("p", p)}
                  <Link to={`/product/${p.slug}`}>{p.productName}</Link>
                  <span
                    onClick={() => handleRemove(p._id)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
