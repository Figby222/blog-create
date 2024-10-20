import PropTypes from "prop-types";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";


const CreateBlogPostForm = ({ createBlogPost }) => {
    const [ errors, setErrors ] = useState([]);

    const onSubmit = async (title, text) => {
        const response = await createBlogPost(title, text);

        response.errors && setErrors([ response.errors[0] ]);
    }
    return (
        <>
            <BlogForm onSubmit={(title, text) => onSubmit(title, text)} initialTitle={""} initialText={""} errors={errors} />
        </>
    )
};


CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired
};


export default CreateBlogPostForm;