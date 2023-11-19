import { useNavigate } from "@remix-run/react";
import { useState } from "react";

const HomeProducts = () => {
  // const loaderData: any = useLoaderData();
  const navigate: any = useNavigate();

  const [products, setProducts] = useState([
    "shirt",
    "tshirt",
    "hoodie",
    "jeans",
  ]);

  return (
    <>
      <div className="hproducts">
        {products.length > 0 &&
          products.map((product: any) => {
            return (
              <div
                className="card"
                key={product}
                onClick={() =>
                  navigate(`./products`, {
                    replace: true,
                    relative: "path",
                    state: { ptype: product },
                  })
                }
              >
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
