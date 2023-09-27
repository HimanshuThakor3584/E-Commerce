import { createSlice } from "@reduxjs/toolkit";

const item =
  localStorage.getItem("cart") != null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const totalPrice =
  localStorage.getItem("totalPrice") != null
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0;

const totalQuentity =
  localStorage.getItem("totalQuentity") != null
    ? JSON.parse(localStorage.getItem("totalQuentity"))
    : 0;

const itemPrice =
  localStorage.getItem("itemPrice") != null
    ? JSON.parse(localStorage.getItem("itemPrice"))
    : 0;

const initialState = {
  cart: item,
  totalQuentity: totalQuentity,
  totalPrice: totalPrice,
  itemPrice: itemPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (find >= 0) {
        state.cart[find].quentity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    getCartTotal: (state) => {
      let { totalQuentity, totalPrice, itemPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { price, quentity } = cartItem;
          cartTotal.itemPrice += price;
          console.log(price, quentity);
          const itemTotal = quentity * price;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuentity += quentity;

          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuentity: 0,
          itemPrice: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuentity = totalQuentity;
      state.itemPrice = itemPrice;

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.map((item) => item))
      );

      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

      localStorage.setItem(
        "totalQuentity",
        JSON.stringify(state.totalQuentity)
      );

      localStorage.setItem("itemPrice", JSON.stringify(state.itemPrice));
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    increaseItemQuentity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quentity: item.quentity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuentity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            quentity: item.quentity - (item.quentity > 1 ? 1 : 0),
          };
        }
        return item;
      });
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeItem,
  clearCart,
  increaseItemQuentity,
  decreaseItemQuentity,
} = cartSlice.actions;

export default cartSlice.reducer;
