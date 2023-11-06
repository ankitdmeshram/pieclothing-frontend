import { postAPI } from "~/utils/api";

// all orders
export const getOrders = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// add order
export const addOrder = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// update order
export const updateOrder = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

// delete order
export const deleteOrders = () => {
  try {
    const body = {};
    return postAPI("", body);
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
