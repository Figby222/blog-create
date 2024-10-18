import PropTypes from "prop-types";

const EditBlogPostForm = ({ useAllData, updateBlogPut }) => {
    const { error, loading, data} = useAllData();

    return (
        <>
            <h1 className="loading">Loading</h1>
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired
};

export default EditBlogPostForm;