import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";

export const addCart = (cart: any) => {
  try {
    const { pid, uid, tempUid, size, color } = cart;

    console.log("pid, uid, tempUid, size, color",pid, uid, tempUid, size, color)
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
