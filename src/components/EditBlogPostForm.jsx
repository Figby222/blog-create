import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form.jsx";
import { Link } from "react-router-dom";

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

    const onSubmit = async (title, text, isPublishInputChecked) => {
        const bearerToken = getBearerToken();

        const response = await updateBlogPut(postId, title, text, isPublishInputChecked, bearerToken);

        response.errors && setErrors(response.errors);
    }

    const onDelete = async () => {
        const bearerToken = getBearerToken();

        const response = await deletePost(postId, bearerToken);
    }

    return (
        <>
            <Link>Create</Link>
            <BlogForm onSubmit={(title, text, isPublishInputChecked) => onSubmit(title, text, isPublishInputChecked)} initialTitle={data.title} initialText={data.text} initialPublishedStatus={data.published} errors={errors} />
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