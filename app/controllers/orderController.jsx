import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";
// all orders
export const getOrders = async () => {
  try {
    const body = {};
    return await postAPI(`${domain}/api/order/allorder`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const orderdatabyid = async (id) => {
  try {
    const body = { _id: id };
    return await postAPI(
      `${domain}/api/order/orderdatabyid`,
      JSON.stringify(body)
    );
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const updateOrderById = async (id) => {
  try {
    const body = { _id: id };
    return await postAPI(
      `${domain}/api/order/updateorder`,
      JSON.stringify(body)
    );
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
export const deleteOrders = (id) => {
  try {
    const body = { id };
    return postAPI(`${domain}/api/order/deleteorder`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
