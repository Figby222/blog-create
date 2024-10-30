import PropTypes from "prop-types";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "../styles/CreateBlogPostForm.css";
const CreateBlogPostForm = ({ createBlogPost, getBearerToken }) => {
    const [ errors, setErrors ] = useState([]);
    const [ submitError, setSubmitError ] = useState(false);
    const navigate = useNavigate();

    if (submitError) {
        throw submitError;
    }

    const onSubmit = async (title, text, isPublishInputChecked) => {
        const bearerToken = getBearerToken();

        const response = await createBlogPost(title, text, isPublishInputChecked, bearerToken);

        response.errors && setErrors(response.errors);

        if (response.error) {
            if (response.error.status === 401) {
                navigate("/log-in");
                return;
            }
            setSubmitError(response.error)
        }
    }

    const links = [
        {
            name: "Blogs",
            path: "/posts/create",
            isCurrentPage: false,
        },
        {
            name: "Create",
            path: "/posts/create",
            isCurrentPage: true,
        },
        {
            name: "Sign Up",
            path: "/sign-up",
            isCurrentPage: false,
        },
        {
            name: "Log In",
            path: "/log-in",
            isCurrentPage: false,
        }
    ]
    return (
        <>
            <Header links={links} loggedInUser={null} />
            <main>
                <BlogForm onSubmit={(title, text, isPublishInputChecked) => onSubmit(title, text, isPublishInputChecked)} initialTitle={""} initialText={""} initialPublishedStatus={false} errors={errors} />
            </main>
        </>
    )
};


CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
};


export default CreateBlogPostForm;