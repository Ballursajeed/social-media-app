import axios from "axios"

export const likePost = (id) => async(dispatch) => {
      try {

            dispatch({
               type:"likeRequest",
            });

            const { data } = await axios.get(`http://localhost:8000/api/v1/post/${id}`, {
                     withCredentials: true,
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

export const commentPost = (id,comment) => async(dispatch) => {
      try {

            dispatch({
               type:"commentRequest",
            });

            const { data } = await axios.put(`http://localhost:8000/api/v1/post/comment/${id}`
            , {
               comment,
               } , {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

        console.log(data);

            dispatch({
               type:"commentSuccess",
               payload:data.message
            })

      } catch (error) {
         dispatch({
          type:"commentFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}