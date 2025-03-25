import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: []
    },
    reducers: {
        addToCart: (state, action) => {
            let indx = state.value.findIndex((ele) => ele._id === action.payload._id)
            if (indx !== -1) {
                state.value.push(action.payload)
            }
        },

        addToCartApi: (state, action) => {
            state.value = action.payload
        },

        DeleteToCart: (state, action) => {
            let indx = state.value.findIndex((ele) => ele._id === action.payload)
            state.value.splice(indx, 1)
            toast.error("Deleted")
        },

        updateCart: (state, action) => {
            let indx = state.value.findIndex((ele) => ele._id === action.payload._id)
            state.value.splice(indx, 1, action.payload)
        },
    }

})

export const { addToCart, DeleteToCart, updateCart, addToCartApi } = cartSlice.actions;
export default cartSlice.reducer;
