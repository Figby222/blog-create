import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form.jsx";

const EditBlogPostForm = ({ useAllData, updateBlogPut, getBearerToken, deletePost }) => {
    const { postId } = useParams();
    const { error, loading, data} = useAllData(postId);
    const [ errors, setErrors ] = useState([]);
    
    if (loading) {
        return <h1 className="loading">Loading</h1>
    }

    if (error) {
        return <h1 className="error">An error has occurred</h1>
    }

    const onSubmit = async (title, text) => {
        const bearerToken = getBearerToken();

        const response = await updateBlogPut(postId, title, text, bearerToken);

        response.errors && setErrors(response.errors);
    }

    const onDelete = async () => {
        const bearerToken = getBearerToken();

        const response = await deletePost(postId, bearerToken);
    }

    return (
        <>
            <BlogForm onSubmit={(title, text) => onSubmit(title, text)} initialTitle={data.title} initialText={data.text} initialPublishedStatus={data.published} errors={errors} />
            <Form submitListener={() => onDelete()} submitButtonText={"Delete"}>       
            </Form>
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

export default EditBlogPostForm;