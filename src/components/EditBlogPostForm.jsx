import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditBlogPostForm = ({ useAllData, updateBlogPut, getBearerToken }) => {
    const { postId } = useParams();
    const { error, loading, data} = useAllData(postId);
    const [ errors, setErrors ] = useState([]);

    getBearerToken();
    
    if (loading) {
        return <h1 className="loading">Loading</h1>
    }

    if (error) {
        return <h1 className="error">An error has occurred</h1>
    }

    const onSubmit = async (title, text) => {
        const response = await updateBlogPut(title, text, "Bearer testToken");

        response.errors && setErrors(response.errors);
    }

    return (
        <>
            <BlogForm onSubmit={(title, text) => onSubmit(title, text)} initialTitle={data.title} initialText={data.text} errors={errors} />
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
};

export default EditBlogPostForm;