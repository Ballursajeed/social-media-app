import { createReducer } from "@reduxjs/toolkit";

const initialState = {}

export const likeReducer = createReducer(initialState,(builder) => {
	builder
     .addCase("likeRequest", (state) => {
              state.loading = true
     })
     .addCase("likeSuccess", (state,action) => {
               state.loading = false;
               state.message = action.payload;
     })
     .addCase("likeFailure", (state,action) => {
               state.loading = false;
               state.error = action.payload;
     })
     .addCase("clearError",(state) => {
             state.error = null
     })
     .addCase("clearMessage",(state) => {
            state.message = null
     })
})