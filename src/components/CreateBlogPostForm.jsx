import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";

const CreateBlogPostForm = ({ createBlogPost }) => {
    return (
        <>
            <label className="title" htmlFor="title">
                Title
                <input type="text" name="title" id="title" />
            </label>
            <TextBox label={"Text"} placeholder={""} value={""} onChange={() => {}} />
        </>
    )
};

CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired
};

export default CreateBlogPostForm;