import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { domain } from "~/utils/domain";
// import { getProducts } from "~/controllers/productController";

const Products = ({ ptype }) => {
  const loaderData = useLoaderData();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (loaderData?.products) {
      console.log(loaderData?.products);
      if (ptype != null) {
        console.log("ptyope", ptype?.ptype);
        setProducts(() => {
          const pdata = loaderData.products.filter(
            (p) => p.type == ptype?.ptype
          );
          return pdata;
        });
      } else {
        setProducts(loaderData?.products);
      }
    }
  }, [loaderData]);

  return (
    <>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <Link to={`../product/${product?._id}`} key={product?._id}>
                <div className="card">
                  {product?.gallery.length > 0 ? (
                    <img
                      className="product-image"
                      src={`${domain}/imgs/${product?.gallery[0]}`}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <img
                      className="product-image"
                      src={`${domain}/imgs/1700847513859.png`}
                      alt=""
                      loading="lazy"
                    />
                  )}

                  <h1>{product?.name}</h1>
                  <p className="pricing">
                    {product?.offerPrice > 0 ? (
                      <>
                        Rs.{product?.offerPrice}{" "}
                        <span>Rs.{product?.price}</span>
                      </>
                    ) : (
                      <>Rs.{product?.price}</>
                    )}
                  </p>
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: `${product?.description.slice(0, 20)}...`,
                    }}
                  ></p>
                </div>
              </Link>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center" }}>Coming Soon...</h2>
        )}
      </div>
    </>
  );
};

export default Products;
