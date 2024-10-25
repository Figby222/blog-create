import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import { useState } from "react";
import Form from "./Form.jsx";
import Errors from "./Errors.jsx";

const BlogForm = ({ onSubmit, initialTitle, initialText, initialPublishedStatus, errors }) => {
    const [ title, setTitle ] = useState(initialTitle);
    const [ text, setText ] = useState(initialText);

    return (
        <>
            <Form submitListener={() => onSubmit(title, text)} submitButtonText={"Submit"}>
                <Errors errors={errors} />
                <label className="title" htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <p className="publish">Publish</p>
                <TextBox label={"Text"} placeholder={""} value={text} onChange={(value) => setText(value)} />
            </Form>
        </>
    )
};

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialTitle: PropTypes.string,
    initialText: PropTypes.string,
    initialPublishedStats: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string.isRequired
    }))
}

export default BlogForm;