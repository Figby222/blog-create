import PropTypes from "prop-types";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";


const CreateBlogPostForm = ({ createBlogPost, getBearerToken }) => {
    const [ errors, setErrors ] = useState([]);

    const onSubmit = async (title, text) => {
        const bearerToken = getBearerToken();

        const response = await createBlogPost(title, text, bearerToken);

        response.errors && setErrors(response.errors);
    }
    return (
        <>
            <BlogForm onSubmit={(title, text) => onSubmit(title, text)} initialTitle={""} initialText={""} errors={errors} />
        </>
    )
};


CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
};


export default CreateBlogPostForm;