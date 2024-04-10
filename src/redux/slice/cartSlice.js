import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

function checkKho (cartQuantity,sum){
  console.log(cartQuantity,sum,)
  console.log(cartQuantity=sum)
  if(cartQuantity!= '') return false
  if(Number(cartQuantity) == Number(sum)){
   
    return true;
  }
  return false
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // console.log(action?.payload)
      const newItem = action.payload;

      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

   
      if(newItem?.cartQuantity >= newItem?.sum){
        toast.error(`Số lượng hàng hiện đã quá mức cho phép đặt`, {
          position: "bottom-left",
        });
        return;
      }


      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
      
          toast.info(`${action.payload.name} increased by one`, {
            position: "bottom-left",
          });


      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
          toast.success(`${action.payload.name} added to cart`, {
            position: "bottom-left",
          });
      }
      // console.log("cartItems", state.cartItems[productIndex].cartQuantity);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} decreased by one`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // return state.cartItems;
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "bottom-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        return array.push(item.cartQuantity ? item.cartQuantity : 0);
      });

      const totalQuantity = array.reduce((a, b) => a + b, 0);

      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
