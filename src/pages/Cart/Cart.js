import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../../Components/CheckoutCard/ProductCardInCheckout";
import { userCart } from "../../functions/user";

const Cart = ({ history }) => {
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;
  const { cart } = useSelector((state) => ({ ...state }));
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3000`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
      });
  }, []);

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, currentUser)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("Cart save error", err));
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, currentUser)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("Cart save error", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Qty</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <>
      <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-lg-8">
            <h4>Cart / {cart.length} Product</h4>
            {!cart.length ? (
              <>
                <h4>
                  No Products in Cart.<Link to="/shop">Continue Shopping</Link>
                </h4>
              </>
            ) : (
              showCartItems()
            )}
          </div>
          <div className="col-lg-4">
            <h4>Order Summary</h4>
            <hr />
            <p>Products</p>
            {cart.map((c, i) => {
              return (
                <div key={i}>
                  <p>
                    {c.productName} x {c.count} = Rs. {c.price * c.count}
                  </p>
                </div>
              );
            })}
            <hr />
            Total: <b>Rs.{getTotal()}</b>
            <hr />
            {token && cart.length ? (
              <>
                <button
                  onClick={saveOrderToDb}
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!cart.length}
                >
                  Proceed To Checkout
                </button>
                <br />
                <button
                  onClick={saveCashOrderToDb}
                  className="btn btn-sm btn-warning mt-2"
                  disabled={!cart.length}
                >
                  Pay Cash on Delivery
                </button>
              </>
            ) : (
              <>
                {token ? (
                  <>
                    <button
                      onClick={saveOrderToDb}
                      className="btn btn-sm btn-primary mt-2"
                      disabled={!cart.length}
                    >
                      Proceed To Checkout
                    </button>
                  </>
                ) : (
                  <button
                    disabled={!cart.length}
                    className="btn btn-sm btn-primary mt-2"
                  >
                    <Link
                      to={{
                        pathname: "/login",
                        state: { from: "cart" },
                      }}
                    >
                      Login To Checkout
                    </Link>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
