import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

// all products
export const getProducts = () => {
  try {
    const body = {};
    return postAPI(`${domain}/api/product/allproducts`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// add products
export const addProduct = (product: any) => {
  try {
    const body = product;
    return postAPI(`${domain}/api/product/createproduct`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// update products
export const updateProduct = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// delete product
export const deleteProduct = (_id: string) => {
  try {
    const body = {
      _id: _id,
    };
    return postAPI(`${domain}/api/product/deleteproduct`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
