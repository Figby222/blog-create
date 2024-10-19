import PropTypes from "prop-types";

const EditBlogPostForm = ({ useAllData, updateBlogPut }) => {
    const { error, loading, data} = useAllData();

    if (loading) {
        return <h1 className="loading">Loading</h1>
    }

    return (
        <>
            <h1 className="error">An error has occurred</h1>
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired
};

export default EditBlogPostForm;