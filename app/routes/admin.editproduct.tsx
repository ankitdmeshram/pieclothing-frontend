import AdminHeader from "~/component/adminHeader";
import styles from "../styles/admin.css";
import AdminSidebar from "~/component/adminSidebar";
import { useEffect, useState } from "react";
import { singleProduct, updateProduct } from "~/controllers/productController";
import { useLocation } from "@remix-run/react";
import isadmin from "~/component/isadmin";
const AdminEditProduct = () => {
  isadmin();

  const location = useLocation();
  const [productForm, setProductForm] = useState({
    name: "",
    category: [],
    description: "",
    size: [],
    color: [],
    price: 0,
    offerPrice: 0,
    gallery: [],
    seo_title: "",
    seo_description: "",
    seo_keywords: [],
  });
  const [productCategory, setProductCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [seo_keywords, setSeo_Keyword] = useState("");

  const productId = location.state;

  const productDetails = async () => {
    const product: any = await singleProduct(productId);
    setProductForm(() => {
      return product.product;
    });
  };

  useEffect(() => {
    productDetails();
  }, []);

  useEffect(() => {
    console.log(productForm);
  }, [productForm]);

  const editPro = async () => {
    try {
      if (productForm?.name && productForm?.price) {
        const response: any = await updateProduct(productForm);
        console.log(response);
        if (response?.success) {
          alert("Product Updated Successfully");
        } else {
          alert("Something went wrong");
        }
      } else {
        alert("Product Name and price are required fields");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Something went wrong", error);
    }
  };

  return (
    <>
      <div className="dash-container">
        <AdminSidebar />
        <div className="dash-main">
          <AdminHeader />
          <div className="dash-body">
            <div className="dash-content">
              <div className="pro-form">
                <div className="input-box">
                  <label>Product Name: </label>
                  <input
                    placeholder="Product Name"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev: any) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      })
                    }
                    value={productForm?.name}
                  />
                </div>
                <div className="input-box">
                  <label>Category: </label>
                  <div className="input-flex">
                    <input
                      placeholder="Category"
                      type="text"
                      onChange={(e) => {
                        setProductCategory(e.target.value);
                      }}
                      value={productCategory}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        productCategory.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              category: [...prev.category, productCategory],
                            };
                            setProductCategory("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.category.length > 0 && (
                    <p className="tags-name">
                      {productForm?.category.length > 0 &&
                        productForm?.category.map((cat: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newCat = prev.category.filter(
                                    (c: any) => c != cat
                                  );
                                  return {
                                    ...prev,
                                    category: newCat,
                                  };
                                });
                              }}
                            >
                              {cat}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label>Description: </label>
                  <textarea
                    placeholder="Description"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          description: e.target.value,
                        };
                      })
                    }
                    value={productForm?.description}
                  ></textarea>
                </div>
                <div className="input-box">
                  <label>Size: </label>
                  <div className="input-flex">
                    <input
                      placeholder="Size"
                      type="text"
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                      value={size}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        size.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              size: [...prev.size, size],
                            };
                            setSize("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.size.length > 0 && (
                    <p className="tags-name">
                      {productForm?.size.length > 0 &&
                        productForm?.size.map((size: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newSize = prev.size.filter(
                                    (s: any) => s != size
                                  );
                                  return {
                                    ...prev,
                                    size: newSize,
                                  };
                                });
                              }}
                            >
                              {size}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label>Color: </label>
                  <div className="input-flex">
                    <input
                      placeholder="Color"
                      type="text"
                      onChange={(e) => {
                        setColor(e.target.value);
                      }}
                      value={color}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        color.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              color: [...prev.color, color],
                            };
                            setColor("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.color.length > 0 && (
                    <p className="tags-name">
                      {productForm?.color.length > 0 &&
                        productForm?.color.map((color: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newColor = prev.color.filter(
                                    (c: any) => c != color
                                  );
                                  return {
                                    ...prev,
                                    color: newColor,
                                  };
                                });
                              }}
                            >
                              {color}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <div className="input-box">
                  <label>Price: </label>
                  <input
                    placeholder="Price"
                    type="number"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          price: Number(e.target.value),
                        };
                      })
                    }
                    value={productForm?.price}
                  />
                </div>
                <div className="input-box">
                  <label>Offer Price: </label>
                  <input
                    placeholder="Offer Price"
                    type="number"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          offerPrice: Number(e.target.value),
                        };
                      })
                    }
                    value={productForm?.offerPrice}
                  />
                </div>
                <div className="input-box">
                  <label>SEO Title: </label>
                  <input
                    placeholder="SEO Title"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          seo_title: e.target.value,
                        };
                      })
                    }
                    value={productForm?.seo_title}
                  />
                </div>
                <div className="input-box">
                  <label>SEO Description: </label>
                  <input
                    placeholder="SEO Description"
                    type="text"
                    onChange={(e) =>
                      setProductForm((prev) => {
                        return {
                          ...prev,
                          seo_description: e.target.value,
                        };
                      })
                    }
                    value={productForm?.seo_description}
                  />
                </div>
                <div className="input-box">
                  <label>SEO Keywords: </label>
                  <div className="input-flex">
                    <input
                      placeholder="SEO Keywords"
                      type="text"
                      onChange={(e) => {
                        setSeo_Keyword(e.target.value);
                      }}
                      value={seo_keywords}
                    />
                    <button
                      className="pro-form-btn"
                      onClick={() => {
                        seo_keywords.length > 0 &&
                          setProductForm((prev: any) => {
                            const newFormData = {
                              ...prev,
                              seo_keywords: [
                                ...prev.seo_keywords,
                                seo_keywords,
                              ],
                            };
                            setSeo_Keyword("");
                            return newFormData;
                          });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {productForm?.seo_keywords.length > 0 && (
                    <p className="tags-name">
                      {productForm?.seo_keywords.length > 0 &&
                        productForm?.seo_keywords.map((keyword: any, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                setProductForm((prev: any) => {
                                  const newKeyword = prev.seo_keywords.filter(
                                    (k: any) => k != keyword
                                  );
                                  return {
                                    ...prev,
                                    seo_keywords: newKeyword,
                                  };
                                });
                              }}
                            >
                              {keyword}
                            </span>
                          );
                        })}
                    </p>
                  )}
                </div>
                <button className="submit-btn" onClick={() => editPro()}>
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
