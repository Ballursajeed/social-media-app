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
export const deleteComment = (id,commentId) => async(dispatch) => {
      try {

            dispatch({
               type:"deleteCommentRequest",
            });

     const { data } = await axios.delete(`http://localhost:8000/api/v1/post/comment/${id}`, {
      withCredentials: true,
      data: { commentId }, // Assuming commentId should be sent in the request body
    });

        console.log(data);

            dispatch({
               type:"deleteCommentSuccess",
               payload:data.message
            })

      } catch (error) {
         dispatch({
          type:"deleteCommentFailure",
        payload: {
        message: error.message,
        status: error.response ? error.response.status : null,
      },
   })
  }
}