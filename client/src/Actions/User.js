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

     console.log(data);

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