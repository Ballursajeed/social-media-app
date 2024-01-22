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
      .addCase("commentRequest", (state) => {
              state.loading = true
     })
     .addCase("commentSuccess", (state,action) => {
               state.loading = false;
               state.message = action.payload;
     })
     .addCase("commentFailure", (state,action) => {
               state.loading = false;
               state.error = action.payload;
     })
    .addCase("deleteCommentRequest", (state) => {
              state.loading = true
     })
     .addCase("deleteCommentSuccess", (state,action) => {
               state.loading = false;
               state.message = action.payload;
     })
     .addCase("deleteCommentFailure", (state,action) => {
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

export const myPostReducer = createReducer(initialState,(builder) => {
   builder
    .addCase("myPostsRequest",(state) => {
         state.loading = true;
    })
    .addCase("myPostsSuccess",(state,action) => {
               state.loading = false;
               state.posts = action.payload;
    })
    .addCase("myPostsFailure",(state,action) => {
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