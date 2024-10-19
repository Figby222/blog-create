import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";

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
            <label className="title" htmlFor="title">
                Title
                <input type="text" name="title" id="title" value={data.title} />
            </label>
            <TextBox label={"Text"} placeholder={""} value={""} onChange={() => {}} />
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired
};

export default EditBlogPostForm;