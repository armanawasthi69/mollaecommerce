import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        value : []
    },
    reducers :{
        addToCart : (state,action)=>{
           state.value.push(action.payload)
        },

        DeleteToCart : (state,action)=>{
          let indx = state.value.findIndex((ele)=>ele.id === action.payload)
          state.value.splice(indx,1)
          toast.error("Deleted")
        },

        Increment : (state,action)=>{
          let id = action.payload
          let indx = state.value.findIndex((ele)=>ele.id === id)
          if(state.value[indx].quantity<10){
              state.value[indx].quantity += 1
          }
        },

        Decrement : (state,action)=>{
            let id = action.payload
            let indx = state.value.findIndex((ele)=>ele.id === id)
            if(state.value[indx].quantity>1){
                state.value[indx].quantity -= 1
            }
        }
    }

})

export const {addToCart,DeleteToCart,Increment,Decrement} = cartSlice.actions;
export default cartSlice.reducer;
