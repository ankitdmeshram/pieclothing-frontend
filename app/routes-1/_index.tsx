import Navbar from "~/component/navbar";
import styles from "../styles/index.css";
import Hero from "~/component/hero";
import Products from "~/component/products";
import { getProducts } from "~/controllers/productController";
const _index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
    </>
  );
};

export default _index;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader = async () => {
  try {
    return await getProducts();
  } catch (e) {
    return { message: "something went wrong" };
  }
};
