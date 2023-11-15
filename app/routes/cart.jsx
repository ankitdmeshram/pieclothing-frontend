import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "~/styles/cart.css";
import { getCookie, setCookie } from "../utils/cookies";
import { useEffect, useState } from "react";
import { viewCart } from "~/controllers/cartController";
import { frontdomain } from "~/utils/domain";

const Cart = () => {
  const [userId, setUserId] = useState("");
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = () => {
    getCookie("UD")
      .then((res) => {
        if (!res) {
          throw err;
        }
        console.log("res 18", res);
        console.log("res 19", JSON.parse(res)?._id);
        setUserId(JSON.parse(res)?._id);
        viewCartById(JSON.parse(res)?._id);
      })
      .catch((err) => {
        getCookie("TUD")
          .then((res) => {
            if (!res) {
              throw err;
            }
            console.log("Res 27", res);
            setUserId(res);
            viewCartById(res);
          })
          .catch((err) => {
            const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            const numberChars = "0123456789";
            const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

            const allChars =
              uppercaseChars + lowercaseChars + numberChars + specialChars;

            let tempUser = "";
            for (let i = 0; i < 15; i++) {
              const randomIndex = Math.floor(Math.random() * allChars.length);
              tempUser += allChars.charAt(randomIndex);
            }

            setCookie("TUD 44", tempUser);
            setUserId(tempUser);
            viewCartById(tempUser);
          });
      });
  };

  const viewCartById = async (uid) => {
    const response = await viewCart(uid);
    if (response) {
      console.log("response 57 ", response);
      if (response?.productList.length > 0) {
        setCartList(response?.productList);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart">
        <table border={0}>
          <thead>
            <tr>
              {/* <th>Sr. No.</th> */}
              <th>Image</th>
              <th style={{ minWidth: "100%" }}>Item</th>
              <th>Price</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody>
            {cartList.length > 0
              ? cartList.map((cart) => {
                  return (
                    <tr key={cart?._id}>
                      {/* <td>1</td> */}
                      <td>
                        <img
                          src={
                            cart?.img?.length > 0
                              ? cart?.img[0]
                              : `${frontdomain}/images/image3.webp`
                          }
                          width={50}
                          alt="{cart?.name}"
                        />
                      </td>
                      <td>{cart?.name}</td>
                      <td>
                        Rs.{" "}
                        {cart?.offerPrice > 0 ? cart?.offerPrice : cart?.price}
                      </td>
                      <td>X</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>

        {/* <div className="cart-container">
            <div className="cart-list">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, nihil eveniet perspiciatis neque, aperiam veritatis laudantium labore officiis quod suscipit necessitatibus provident! Dolore, tempora voluptate impedit iusto voluptates reprehenderit deserunt.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, nihil eveniet perspiciatis neque, aperiam veritatis laudantium labore officiis quod suscipit necessitatibus provident! Dolore, tempora voluptate impedit iusto voluptates reprehenderit deserunt.</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, nihil eveniet perspiciatis neque, aperiam veritatis laudantium labore officiis quod suscipit necessitatibus provident! Dolore, tempora voluptate impedit iusto voluptates reprehenderit deserunt.</p>
            </div>
            <div className="cart-total">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse obcaecati nisi nesciunt dolorem quae sed perspiciatis, adipisci neque distinctio delectus reprehenderit impedit praesentium repellat incidunt, repudiandae voluptatum architecto? Perferendis, ea.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse obcaecati nisi nesciunt dolorem quae sed perspiciatis, adipisci neque distinctio delectus reprehenderit impedit praesentium repellat incidunt, repudiandae voluptatum architecto? Perferendis, ea.</p>
            </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
