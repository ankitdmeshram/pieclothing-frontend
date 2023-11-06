import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { singleProduct } from "../controllers/productController";
import singleProductStyle from "../styles/singleProduct.css";
import Navbar from "~/component/navbar";

const Product = () => {
  const loaderData = useLoaderData();

  const [productDetails, setProductDetails] = useState({});
  const [forCart, setForCart] = useState({
    id: "",
    size: "",
    color: "",
  });
  const [imgUrl, setImgUrl] = useState(
    "http://localhost:8788/images/image3.webp"
  );

  useEffect(() => {
    console.log("Loaderdata", loaderData);
    setProductDetails(loaderData?.product);
  }, [loaderData]);

  useEffect(() => {
    console.log("forCart", forCart);
  }, [forCart]);

  return (
    <>
      <Navbar />
      {/* <div style={{ background: '#D6D7DB', height: '200px' }}>
                <h2 style={{ textAlign: 'center', paddingTop: '100px', fontSize: '36px', color: 'white' }}>All Products</h2>
            </div> */}
      <div className="singleProduct">
        <div className="pro-main">
          <div className="pro-img">
            <img className="main-img" src={imgUrl} alt={productDetails?.name} />

            <div className="img-thumb">
              <img
                src="http://localhost:8788/images/image3.webp"
                alt="test"
                onClick={() =>
                  setImgUrl("http://localhost:8788/images/image3.webp")
                }
              />
              <img
                src="http://localhost:8788/images/image4.webp"
                alt="test"
                onClick={() =>
                  setImgUrl("http://localhost:8788/images/image4.webp")
                }
              />
              <img
                src="http://localhost:8788/images/image5.webp"
                alt="test"
                onClick={() =>
                  setImgUrl("http://localhost:8788/images/image5.webp")
                }
              />
              <img
                src="http://localhost:8788/images/image6.webp"
                alt="test"
                onClick={() =>
                  setImgUrl("http://localhost:8788/images/image6.webp")
                }
              />
            </div>
          </div>

          <div className="pro-details">
            <h1>{productDetails?.name}</h1>
            <h3>
              {productDetails?.offerPrice > 0 ? (
                <>
                  Rs.{productDetails?.offerPrice}{" "}
                  <span>Rs. {productDetails?.price}</span>
                </>
              ) : (
                <>Rs.{productDetails?.price}</>
              )}
            </h3>
            {productDetails?.size?.length > 0 && (
              <p style={{ paddingTop: "10px", fontWeight: "600" }}>size</p>
            )}
            <div className="size">
              {productDetails?.size?.length > 0 &&
                productDetails?.size.map((s, i) => {
                  return forCart?.size == s ? (
                    <div
                      style={{ border: "3px solid black" }}
                      className="box"
                      key={i}
                      onClick={() => {
                        setForCart((prev) => {
                          return {
                            ...prev,
                            size: s,
                          };
                        });
                      }}
                    >
                      {s}{" "}
                    </div>
                  ) : (
                    <div
                      className="box"
                      key={i}
                      onClick={() => {
                        setForCart((prev) => {
                          return {
                            ...prev,
                            size: s,
                          };
                        });
                      }}
                    >
                      {s}
                    </div>
                  );
                })}
            </div>

            {productDetails?.color?.length > 0 && (
              <p style={{ paddingTop: "10px", fontWeight: "600" }}>color</p>
            )}
            <div className="size">
              {productDetails?.color?.length > 0 &&
                productDetails?.color.map((c, i) => {
                  return forCart?.color == c ? (
                    <div
                      style={{ border: "3px solid black" }}
                      className="box"
                      key={i}
                      onClick={() =>
                        setForCart((prev) => {
                          return {
                            ...prev,
                            color: c,
                          };
                        })
                      }
                    >
                      {c}
                    </div>
                  ) : (
                    <div
                      className="box"
                      key={i}
                      onClick={() =>
                        setForCart((prev) => {
                          return {
                            ...prev,
                            color: c,
                          };
                        })
                      }
                    >
                      {c}
                    </div>
                  );
                })}
            </div>

            <div className="add-to-cart">Add To Cart</div>
            <div className="buy-now">Buy Now</div>
            {productDetails?.description && (
              <div className="decription">
                <p style={{ paddingTop: "15px", fontWeight: "600" }}>
                  Description:
                </p>
                <p style={{ paddingTop: "15px" }}>
                  {productDetails?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

export const loader = async ({ params }) => {
  // export async function loader({params}) {
  try {
    const id = params.id;
    return await singleProduct(id);
  } catch (err) {
    console.log(err);
    return { message: "Something went wrong" };
  }
};

export const links = () => [
  {
    rel: "stylesheet",
    href: singleProductStyle,
  },
];
