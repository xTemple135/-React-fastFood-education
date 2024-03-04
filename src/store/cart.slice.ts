import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = "cartData";

export interface CartItem {
  id: number;
  count: number;
}

export interface UserState {
  items: CartItem[];
}

const initialState: UserState = loadState<UserState>(CART_PERSISTENT_STATE) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
    },
    del: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Обновляем состояние с помощью filter
    },
    remove: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((item) => item.id === action.payload);
      if (existed) {
        state.items.map((state) => {
          if (state.id === action.payload && state.count > 1) {
            state.count -= 1;
          }
          return state;
        });
        return;
      }
      state.items.filter((state) => state.id === action.payload);
    },
    addToCart: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((item) => item.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((items) => {
        if (items.id === action.payload) {
          items.count += 1;
        }
        return items;
      });
    },
  },
});

export const { addToCart, remove, del, clear } = cartSlice.actions;
export default cartSlice.reducer;
