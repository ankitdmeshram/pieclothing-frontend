import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

const HomeProducts = () => {
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
      <div className="hproducts">
        {products.length > 0 &&
          products.map((product: any) => {
            return (
              <div className="card" key={product?._id}>
                <img
                  className="product-image"
                  src="https://veloce.in/cdn/shop/files/IMG_2580.png?v=1682005668&width=960"
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

export default HomeProducts;
