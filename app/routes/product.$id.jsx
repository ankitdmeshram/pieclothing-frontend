import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { singleProduct } from "../controllers/productController";
import { addCart } from "../controllers/cartController";
import singleProductStyle from "../styles/singleProduct.css";
import Navbar from "~/component/navbar";
import { getCookie, setCookie } from "../utils/cookies";
import { frontdomain } from "../utils/domain";

const Product = () => {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({});
  const [forCart, setForCart] = useState({
    uid: "",
    tempUid: "",
    pid: "",
    size: "",
    color: "",
  });
  const [whichBtn, setWhichBtn] = useState("add");
  const [imgUrl, setImgUrl] = useState(`${frontdomain}/images/image3.webp`);

  useEffect(() => {
    console.log("Loaderdata", loaderData);
    setProductDetails(loaderData?.product);
    setForCart((prev) => {
      return {
        ...prev,
        pid: loaderData?.product?._id,
      };
    });
    userDetails();
  }, [loaderData]);

  useEffect(() => {
    console.log("forCart", forCart);
  }, [forCart]);

  const userDetails = () => {
    getCookie("UD")
      .then((res) => {
        if (!res) {
          throw err;
        }
        console.log("res", JSON.parse(res));
        setForCart((prev) => {
          return {
            ...prev,
            uid: JSON.parse(res)?._id,
            tempUid: true,
          };
        });
      })
      .catch((err) => {
        getCookie("TUD")
          .then((res) => {
            if (!res) {
              throw err;
            }
            setForCart((prev) => {
              return {
                ...prev,
                uid: res,
                tempUid: true,
              };
            });
          })
          .catch(() => {
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

            setCookie("TUD", tempUser);
            setForCart((prev) => {
              return {
                ...prev,
                uid: tempUser,
                tempUid: true,
              };
            });
          });
      });
  };

  const addToCart = async (_id) => {
    await userDetails();

    if (productDetails?.size.length > 0) {
      if (forCart?.size) {
        console.log("trueeeeee");
      } else {
        alert("Select Size");
        console.log("Falseeee");
        return;
      }
    }
    if (productDetails?.color.length > 0) {
      if (forCart?.color) {
        console.log("trueeee");
      } else {
        alert("Select Color");
        console.log("Falseeee");
        return;
      }
    }

    setForCart((prev) => {
      return {
        ...prev,
        pid: _id,
      };
    });

    console.log("forCart===", forCart);

    const cartResponse = await addCart(forCart);

    if (cartResponse?.success) {
      setWhichBtn("view");
    }
  };

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
                src={`${frontdomain}/images/image3.webp`}
                alt="test"
                onClick={() =>
                  setImgUrl(`${frontdomain}/frontdomainimages/image3.webp`)
                }
              />
              <img
                src={`${frontdomain}/images/image4.webp`}
                alt="test"
                onClick={() =>
                  setImgUrl(`${frontdomain}/frontdomainimages/image4.webp`)
                }
              />
              <img
                src={`${frontdomain}/images/image5.webp`}
                alt="test"
                onClick={() =>
                  setImgUrl(`${frontdomain}/frontdomainimages/image5.webp`)
                }
              />
              <img
                src={`${frontdomain}/images/image6.webp`}
                alt="test"
                onClick={() =>
                  setImgUrl(`${frontdomain}/frontdomainimages/image6.webp`)
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

            {whichBtn == "add" ? (
              <div
                className="add-to-cart"
                onClick={() => addToCart(productDetails?._id)}
              >
                Add To Cart
              </div>
            ) : (
              <div className="add-to-cart" onClick={() => navigate("../cart")}>
                View Cart
              </div>
            )}
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
