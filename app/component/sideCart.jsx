import React, { useState, useEffect } from "react";
import { deleteCart } from "~/controllers/cartController";
import { imgServer } from "~/utils/domain";

const SideCart = ({ isShowCart, cartList, userId }) => {
  const [showCart, setShowCart] = useState(isShowCart);
  const [cartDetails, setCartDetails] = useState([]);
  const [uId, setUid] = useState("");
  useEffect(() => {
    setShowCart(isShowCart);
  }, [isShowCart]);

  useEffect(() => {
    setCartDetails(cartList?.productList);
  }, [cartList]);

  useEffect(() => {
    setUid(userId);
  }, [userId]);

  const deleteCartById = async (_id) => {
    const response = await deleteCart(uId, _id);
    if (response?.success) {
      setCartDetails((prev) => {
        const newCart = prev.filter((p) => p?._id != _id);
        console.log(newCart);
        return newCart;
      });
      console.log("Response 88", response);
    }
  };

  return (
    <>
      <div className="cartBtn" onClick={() => setShowCart(!showCart)}>
        =
      </div>

      <div
        className={showCart ? "fullscreen" : "ca-cncl-no"}
        onClick={() => setShowCart(false)}
      ></div>

      <div className={showCart ? "scart scart-show" : "scart"}>
        <h3>Shopping Cart</h3>
        {cartDetails?.length > 0 &&
          cartDetails.map((p, i) => {
            return (
              <React.Fragment key={i}>
                <div className="cart-det">
                  <div className="cart-img">
                    <img src={`${imgServer}/imgs/${p?.gallery[0]}`} alt="" />
                  </div>
                  <div className="cart-info">
                    <h5>
                      {p?.name}{" "}
                      <span
                        style={{
                          float: "right",
                          fontFamily: "sans-serif",
                          color: "red",
                        }}
                        onClick={() => {
                          confirm("Are you sure ? ") && deleteCartById(p?._id);
                        }}
                      >
                        x
                      </span>
                    </h5>

                    <table
                      border={1}
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      {p?.size && p?.size.length > 0 && (
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                      )}

                      <tbody>
                        {p?.size &&
                          p?.size.length > 0 &&
                          p?.size.map((s) => {
                            return (
                              <tr>
                                <td>{s.size}</td>
                                <td>{s.quantity}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </div>

      <div
        className={showCart ? "ca-cncl" : "ca-cncl-no"}
        onClick={() => setShowCart(false)}
      >
        <svg
          fill="white"
          style={{ width: "30px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
        </svg>
      </div>
    </>
  );
};

export default SideCart;
