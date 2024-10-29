import PropTypes from "prop-types";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";


const CreateBlogPostForm = ({ createBlogPost, getBearerToken }) => {
    const [ errors, setErrors ] = useState([]);
    const [ submitError, setSubmitError ] = useState(false);

    const onSubmit = async (title, text, isPublishInputChecked) => {
        const bearerToken = getBearerToken();

        const response = await createBlogPost(title, text, isPublishInputChecked, bearerToken);

        response.errors && setErrors(response.errors);

        if (response.error) {
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
            <BlogForm onSubmit={(title, text, isPublishInputChecked) => onSubmit(title, text, isPublishInputChecked)} initialTitle={""} initialText={""} initialPublishedStatus={false} errors={errors} />
        </>
    )
};


CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
};


export default CreateBlogPostForm;