import PropTypes from "prop-types";

const CreateBlogPostForm = ({ createBlogPost }) => {
    return (
        <>
            <label className="title" htmlFor="title">
                Title
                <input type="text" name="title" id="title" />
            </label>
        </>
    )
};

CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired
};

export default CreateBlogPostForm;