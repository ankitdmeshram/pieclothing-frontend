import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { singleProduct } from "../controllers/productController";
import { addCart, viewCart } from "../controllers/cartController";
import singleProductStyle from "../styles/singleProduct.css";
import Navbar from "~/component/navbar";
import { getCookie, setCookie } from "../utils/cookies";
import SideCart from "~/component/sideCart";
import { domain, imgServer } from "../utils/domain";
import sideCartStyle from "../styles/sidecart.css";

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

  const [cartList, setCartList] = useState();

  const [whichBtn, setWhichBtn] = useState("add");
  const [imgUrl, setImgUrl] = useState(`${imgServer}/imgs/1700847513859.png`);
  const [msg, setMsg] = useState("");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    console.log("Loaderdata", loaderData);
    setProductDetails(loaderData?.product);
    setImgUrl(`${imgServer}/imgs/${loaderData?.product?.gallery[0]}`);
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

  const userDetails = async () => {
    await getCookie("UD")
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
    viewCartById();
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
      setShowCart(true);
      viewCartById();
    }
  };

  const viewCartById = async () => {
    const response = await viewCart(forCart?.uid);
    if (response) {
      console.log("response 57 ", response);
      if (response?.productList.length > 0) {
        await setCartList(response);
      }
    }
  };

  return (
    <>
      <SideCart
        isShowCart={showCart}
        cartList={cartList}
        userId={forCart?.uid}
      />
      <Navbar />
      <div className="singleProduct">
        <div className="pro-main">
          <div className="pro-img">
            <img className="main-img" src={imgUrl} alt={productDetails?.name} />

            <div className="img-thumb">
              {productDetails?.gallery && productDetails?.gallery.length > 0
                ? productDetails.gallery.map((img) => (
                    <img
                      key={img}
                      src={`${imgServer}/imgs/${img}`}
                      alt="test"
                      onClick={() => setImgUrl(`${imgServer}/imgs/${img}`)}
                    />
                  ))
                : null}
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
                  return forCart?.size == s?.size ? (
                    <div
                      style={{ border: "3px solid black" }}
                      className="box"
                      key={i}
                      onClick={() => {
                        if (s?.quantity == 0) {
                          setMsg("Currently Unavailable");
                          setForCart((prev) => {
                            return {
                              ...prev,
                              size: "",
                            };
                          });
                        } else {
                          setMsg("");
                          setForCart((prev) => {
                            return {
                              ...prev,
                              size: s?.size,
                            };
                          });
                        }
                      }}
                    >
                      {s?.size}{" "}
                    </div>
                  ) : (
                    <div
                      className="box"
                      key={i}
                      onClick={() => {
                        if (s?.quantity == 0) {
                          setMsg("Currently Unavailable");
                          setForCart((prev) => {
                            return {
                              ...prev,
                              size: "",
                            };
                          });
                        } else {
                          setMsg("");
                          setForCart((prev) => {
                            return {
                              ...prev,
                              size: s?.size,
                            };
                          });
                        }
                      }}
                    >
                      {s?.size}
                    </div>
                  );
                })}
            </div>
            {msg && <p style={{ color: "red" }}>{msg}</p>}

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
            {/* <div className="buy-now">Buy Now</div> */}
            {productDetails?.description && (
              <div className="decription">
                <details>
                  <summary style={{ paddingTop: "15px", fontWeight: "600" }}>
                    Description:
                  </summary>
                  <p
                    style={{ paddingTop: "15px" }}
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.description,
                    }}
                  ></p>
                </details>
              </div>
            )}

            {productDetails?.washcare && (
              <div className="decription">
                <details>
                  <summary style={{ paddingTop: "15px", fontWeight: "600" }}>
                    Wash Care:
                  </summary>
                  <p
                    style={{ paddingTop: "15px" }}
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.washcare,
                    }}
                  ></p>
                </details>
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
  {
    rel: "stylesheet",
    href: sideCartStyle,
  },
];
