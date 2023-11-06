import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
// import { getProducts } from "~/controllers/productController";

const Products = () => {
  const loaderData: any = useLoaderData();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (loaderData?.products) {
      console.log(loaderData?.products);
      setProducts(loaderData?.products);
    }
  }, [loaderData]);

  return (
    <>
      <div className="products">
        {products.length > 0 &&
          products.map((product: any) => {
            return (
              <Link to={`../product/${product?._id}`} key={product?._id}>
              <div className="card" >
                <img
                  className="product-image"
                  src="./images/image3.webp"
                  alt=""
                  loading="lazy"
                />
                <h1>{product?.name}</h1>
                <p className="pricing">
                  {
                    product?.offerPrice > 0 ?
                      <>
                        Rs.{product?.offerPrice} <span>Rs.{product?.price}</span>
                      </>
                      : <>Rs.{product?.price}
                      </>}
                </p>
                <p className="description">
                  {product?.description}
                </p>
              </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Products;
