import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const price = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.ownerPushToken;

      let newOrUpdateCartItem;
      if (state.items[addedProduct.id]) {
        newOrUpdateCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          price,
          prodTitle,
          pushToken,
          state.items[addedProduct.id].sum + price
        );
      } else {
        newOrUpdateCartItem = new CartItem(
          1,
          price,
          prodTitle,
          pushToken,
          price
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newOrUpdateCartItem },
        totalAmount: state.totalAmount + price,
      };
    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.productId];
      const currentQty = selectedItem.quantity;

      let updatedItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updatedItems = { ...state.items, [action.productId]: updatedCartItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.productId];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      } else {
        const newItems = { ...state.items };
        const updatedSum = newItems[action.productId].sum;
        delete newItems[action.productId];
        return {
          ...state,
          items: newItems,
          totalAmount: state.totalAmount - updatedSum,
        };
      }
    default:
      return state;
  }
};
