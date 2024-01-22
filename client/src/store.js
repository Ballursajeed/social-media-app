import { configureStore } from "@reduxjs/toolkit";
import { userReducer,
         postOfFollowingReducer,
         allUsersReducer, } from "./Reducers/User";
import { likeReducer, myPostReducer } from "./Reducers/Post";

const store = configureStore({
  reducer:{
          user:userReducer,
          postOfFollowing:postOfFollowingReducer,
          allUsers:allUsersReducer,
          like:likeReducer,
          myPosts:myPostReducer
  },
});

export default store;