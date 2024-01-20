import axios from "axios"

export const likePost = (id) => async(dispatch) => {
      try {

            dispatch({
               type:"likeRequest",
            });

            const { data } = await axios.get(`http://localhost:8000/api/v1/post/${id}`, {
      withCredentials: true, // Include credentials (cookies) in the request
    });

        console.log(data);

            dispatch({
               type:"likeSuccess",
               payload:data.message
            })

      } catch (error) {
         dispatch({
          type:"likeFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}