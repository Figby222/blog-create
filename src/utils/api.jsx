import { useState, useEffect } from "react";

const apiLink = "http://localhost:6464/api/v1";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI5NzU5NDMxLCJleHAiOjE3Mjk4NDU4MzF9.487XCpTQCkYAHGrCJtFDg1tIm6sfJh9Q2l5ZJtJVQgM"

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

const updateBlogPut = async (postId, title, text, bearerToken) => {
    try {
        const response = await fetch(`${apiLink}/posts/${postId}`, {
            mode: "cors",
            body: JSON.stringify({ title: title, text: text }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken
            },
            method: "PUT"
        });
    
        const data = await response.json();

        console.log(data);

        return { data }
    } catch(err) {
        return { errors: [
            err
        ]}
    }
}

const createBlogPost = async (title, text) => {
    try {
        const response = await fetch(`${apiLink}/posts`, {
            mode: "cors",
            body: JSON.stringify({ title: title, text: text }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            method: "POST"
        });
    
        const data = await response.json();
        console.log(data);
        return { data }
    } catch(err) {
        return { errors: [
            err
        ]}
    }
}


export { useBlogPostData, updateBlogPut, createBlogPost }