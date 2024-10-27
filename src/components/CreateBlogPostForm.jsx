import PropTypes from "prop-types";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";


const CreateBlogPostForm = ({ createBlogPost, getBearerToken }) => {
    const [ errors, setErrors ] = useState([]);

    const onSubmit = async (title, text, isPublishInputChecked) => {
        const bearerToken = getBearerToken();

        const response = await createBlogPost(title, text, isPublishInputChecked, bearerToken);

        response.errors && setErrors(response.errors);
    }
    return (
        <>
            <Link></Link>
            <BlogForm onSubmit={(title, text, isPublishInputChecked) => onSubmit(title, text, isPublishInputChecked)} initialTitle={""} initialText={""} initialPublishedStatus={false} errors={errors} />
        </>
    )
};


CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
};


export default CreateBlogPostForm;