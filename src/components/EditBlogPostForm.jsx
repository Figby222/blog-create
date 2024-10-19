import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";

const EditBlogPostForm = ({ useAllData, updateBlogPut }) => {
    const { error, loading, data} = useAllData();

    if (loading) {
        return <h1 className="loading">Loading</h1>
    }

    if (error) {
        return <h1 className="error">An error has occurred</h1>
    }

    
    return (
        <>
            <BlogForm onSubmit={() => updateBlogPut()} initialTitle={data.title} initialText={data.text} errors={[]} />
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired
};

export default EditBlogPostForm;