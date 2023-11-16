import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

export const addCart = (cart: any) => {
  try {
    const { pid, uid, tempUid, size, color } = cart;

    console.log(
      "pid, uid, tempUid, size, color",
      pid,
      uid,
      tempUid,
      size,
      color
    );
    const body = {
      pid,
      uid,
      tempUid,
      size,
      color,
    };
    return postAPI(`${domain}/api/cart/addtocart`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const viewCart = (uid: string) => {
  try {
    return postAPI(`${domain}/api/cart/viewcart`, JSON.stringify({ uid }));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

export const deleteCart = (uid: string, pid: string) => {
  try {
    const body = {
      uid,
      pid,
    };
    console.log(body);
    return postAPI(`${domain}/api/cart/deletecart`, JSON.stringify(body));
  } catch (err) {
    console.log("Something went wrong", err);
  }
};
