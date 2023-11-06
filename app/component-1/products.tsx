import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getProducts } from "~/controllers/productController";

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
              <div className="card" key={product?._id}>
                <h1>{product?.name}</h1>
                <img
                  className="product-image"
                  src="./images/image3.webp"
                  alt=""
                  loading="lazy"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Products;
