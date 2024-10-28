import { useState, useEffect } from "react";

const apiLink = "http://localhost:6464/api/v1";

const useBlogPostData = (postId) => {
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch(`${apiLink}/posts/${postId}`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${authToken}`
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
                    published: response.published,
                    comments: response.comments,
                })
            })
            .catch((err) => setError(err))
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return { error: error, loading: loading, data: data }
}

const updateBlogPut = async (postId, title, text, shouldPublish, bearerToken) => {
    try {
        const response = await fetch(`${apiLink}/posts/${postId}`, {
            mode: "cors",
            body: JSON.stringify({ title: title, text: text, published: shouldPublish }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken
            },
            method: "PUT"
        });
    
        const data = await response.json();

        console.log(data);

        return { data, errors: data.errors }
    } catch(err) {
        return { errors: [
            err
        ]}
    }
}



const createBlogPost = async (title, text, shouldPublish, bearerToken) => {
    try {
        const response = await fetch(`${apiLink}/posts`, {
            mode: "cors",
            body: JSON.stringify({ title: title, text: text, published: shouldPublish }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken
            },
            method: "POST"
        });
    
        const data = await response.json();
        console.log(data);
        return { data, errors: data.errors }
    } catch(err) {
        return { errors: [
            err
        ]}
    }
}

const deletePost = async (postId, bearerToken) => {
    try {
        const response = await fetch(`${apiLink}/posts/${postId}`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken,
                method: "DELETE"
            }
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

const createAnAccount = async (username, email, password, confirmPassword) => {
    try {
        const response = await fetch(`${apiLink}/users`, {
            mode: "cors",
            body: JSON.stringify({ username: username, email: email, password: password, confirmPassword: confirmPassword }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
    
        const data = await response.json();

        console.log(data);

        return { data, errors: data.errors };
    } catch (err) {
        return { errors: [
            err
        ]}
    }
}

const logInUser = async (username, email, password) => {
    try {
        const response = await fetch(`${apiLink}/users/log-in`, {
            mode: "cors",
            body: JSON.stringify({ username: username, email: email, password: password }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });

        
        console.log(response.headers.get("Authorization"));
        
        const data = await response.json()
        
        console.log(data);
        if (response.status >= 400) {
            return { errors: [
                {
                    path: "all",
                    msg: data.message
                }
            ]}
        }
        
        const authToken = response.headers.get("Authorization");
        
        return { token: authToken, message: data.message, errors: data.errors }
    } catch(err) {
        return { errors: [
            err
        ]};
    }


}

const deleteComment = async (postId, commentId, bearerToken) => {
    try {
        const response = await fetch(`${apiLink}/posts/${postId}/comments/${commentId}`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken,
            },
            method: "DELETE"
        });
    
        const data = await response.json();

        return { data }
    } catch(err) {
        return { errors: [
            err
        ]}
    }
}

const useBlogsListData = (bearerToken) => {
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(null);
    
    const blogData = {
        blogs: data
    }

    useEffect(() => {
        fetch(`${apiLink}/users/posts`, { 
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken,
            }
         })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setData(response)
            })
            .catch((err) => setError(err))
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return { error: error, loading: loading, data: blogData }
}



export { useBlogPostData, updateBlogPut, createBlogPost, deletePost, createAnAccount, logInUser, deleteComment, useBlogsListData }