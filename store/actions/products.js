export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "EDIT_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId: productId };
};

export const createProduct = (title, imageUrl, price, description) => {
  return {
    type: ADD_PRODUCT,
    productData: {
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    },
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title: title, // esto es lo mismo que title: title
      imageUrl: imageUrl,
      description: description,
    },
  };
};
