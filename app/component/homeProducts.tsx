import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { domain } from "~/utils/domain";

const HomeProducts = () => {
  // const loaderData: any = useLoaderData();
  const navigate: any = useNavigate();

  const [products, setProducts] = useState([
    { type: "shirt", img: `${domain}/imgs/1700709880791.jpeg` },
    { type: "tshirt", img: "images/img3.png" },
    { type: "hoodie", img: "images/img4.png" },
    { type: "jeans", img: "images/img1.png" },
  ]);

  return (
    <>
      <div className="hproducts">
        {products.length > 0 &&
          products.map((product: any) => {
            return (
              <div
                className="card"
                key={product.type}
                onClick={() =>
                  navigate(`./products`, {
                    replace: true,
                    relative: "path",
                    state: { ptype: product.type },
                  })
                }
              >
                <img
                  className="product-image"
                  src={product?.img}
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
