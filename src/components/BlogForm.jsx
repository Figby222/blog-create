import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import { useState } from "react";
import Form from "./Form.jsx";

const BlogForm = ({ onSubmit, initialTitle, initialText, errors }) => {
    const [ title, setTitle ] = useState(initialTitle);
    const [ text, setText ] = useState(initialText);

    return (
        <>
            <Form submitListener={() => onSubmit()} submitButtonText={"Submit"}>
                <label className="title" htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <TextBox label={"Text"} placeholder={""} value={text} onChange={(value) => setText(value)} />
            </Form>
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