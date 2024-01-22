import axios from "axios"

export const loginUser = (email,password) => async(dispatch) => {
  try {


   dispatch({
        type:"LoginRequest"
   })

     const {data} = await axios.post("http://localhost:8000/api/v1/user/login",{email,password}, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

     dispatch({
        type:"LoginSuccess",
        payload:data.user,
   })


  } catch (error) {
         dispatch({
          type:"LoginFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}

export const loadUser = () => async(dispatch) => {
  try {


   dispatch({
        type:"LoadUserRequest"
   })

      const {data} = await axios.get("http://localhost:8000/api/v1/user/me", {
      withCredentials: true, // Include credentials (cookies) in the request
    });

     dispatch({
        type:"LoadUserSuccess",
        payload:data.user,
   })


  } catch (error) {
         dispatch({
          type:"LoadUserFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}

export const getFollowingPost = () => async(dispatch) => {
      try {

            dispatch({
               type:"PostOfFollowingRequest",
            });

            const { data } = await axios.get("http://localhost:8000/api/v1/post", {
      withCredentials: true, // Include credentials (cookies) in the request
    });
            dispatch({
               type:"PostOfFollowingSuccess",
               payload:data.posts
            })

      } catch (error) {
         dispatch({
          type:"PostOfFollowingFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}

export const getMyPosts = () => async(dispatch) => {
      try {

            dispatch({
               type:"myPostsRequest",
            });

            const { data } = await axios.get("http://localhost:8000/api/v1/user/my/posts", {
      withCredentials: true, // Include credentials (cookies) in the request
    });

    console.log(data)
            dispatch({
               type:"myPostsSuccess",
               payload:data.posts
            })

      } catch (error) {
         dispatch({
          type:"myPostsFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}

export const getAllUsers = () => async(dispatch) => {
      try {

            dispatch({
               type:"allUserRequest",
            });

            const { data } = await axios.get("http://localhost:8000/api/v1/user/users", {
      withCredentials: true, // Include credentials (cookies) in the request
    });

        console.log(data);

            dispatch({
               type:"allUserSuccess",
               payload:data.users
            })

      } catch (error) {
         dispatch({
          type:"allUserFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}