import PropTypes from "prop-types";

const CreateBlogPostForm = ({ createBlogPost }) => {
    return (
        <>
            <p className="title">Title</p>
        </>
    )
};

CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired
};

export default CreateBlogPostForm;