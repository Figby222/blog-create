import PropTypes from "prop-types";

const BlogForm = ({ onSubmit, initialTitle, initialText, errors }) => {
    return (
        <>
            <label className="title" htmlFor="title">
                Title
                <input type="text" name="title" id="title" />
            </label>
        </>
    )
};

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialTitle: PropTypes.string,
    initialText: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired
    }))
}

export default BlogForm;