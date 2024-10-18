import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import { useState } from "react";

const BlogForm = ({ onSubmit, initialTitle, initialText, errors }) => {
    const [ title, setTitle ] = useState(initialTitle);
    return (
        <>
            <label className="title" htmlFor="title">
                Title
                <input type="text" name="title" id="title" 
                    value={title}
                    onChange={(e) => setTitle("Test Typed In Title")}
                />
            </label>
            <TextBox label={"Text"} placeholder={""} value={initialText} onChange={() => {}} />
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