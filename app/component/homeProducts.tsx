import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { domain } from "~/utils/domain";

const HomeProducts = () => {
  // const loaderData: any = useLoaderData();
  const navigate: any = useNavigate();

  const [products, setProducts] = useState([
    { type: "tshirt", img: `${domain}/imgs/1700849106800.png` },
    { type: "hoodie", img: `${domain}/imgs/1700849251732.png` },
    { type: "shirt", img: `${domain}/imgs/1700849319387.png` },
    { type: "sweartshirt", img: `${domain}/imgs/1700849395085.png` },
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
                    state: { ptype: product?.type },
                  })
                }
              >
                <img
                  className="product-image"
                  src={product?.img}
                  alt={product?.type}
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
