import { useState, useEffect } from "react";

const apiLink = "http://localhost:6464/api/v1";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI5NTkxNTIzLCJleHAiOjE3Mjk2Nzc5MjN9.SSeHbNddkOuL3u_3Q5KlYFBLx0CvqoiDztKqjZtok6I"

const useBlogPostData = (postId) => {
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch(`${apiLink}/posts/${postId}`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setData({
                    title: response.title,
                    text: response.text,
                })
            })
            .catch((err) => setError(err))
            .finally(() => {
                setLoading(false);
            })
    })

    return { error: error, loading: loading, data: data }
}

export { useBlogPostData }