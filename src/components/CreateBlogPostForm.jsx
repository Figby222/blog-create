import PropTypes from "prop-types";
import BlogForm from "./BlogForm.jsx";


const CreateBlogPostForm = ({ createBlogPost }) => {
    return (
        <>
            <BlogForm onSubmit={(title, text) => createBlogPost(title, text)} initialTitle={""} initialText={""} errors={[]} />
        </>
    )
};


CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired
};


export default CreateBlogPostForm;