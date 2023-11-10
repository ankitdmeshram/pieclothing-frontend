import Footer from "~/component/footer";
import Navbar from "~/component/navbar";
import styles from "~/styles/cart.css";

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="cart">
        <table border={0}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Image</th>
              <th style={{ width: "100%" }}>Item</th>
              <th>Price</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img
                  src={"http://localhost:8788/images/image3.webp"}
                  width={50}
                  alt="tsrhit"
                />
              </td>
              <td>Item Name</td>
              <td>Rs.100</td>
              <td>X</td>
            </tr>
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
