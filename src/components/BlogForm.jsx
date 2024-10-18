import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import { useState } from "react";
import Form from "./Form.jsx";

const BlogForm = ({ onSubmit, initialTitle, initialText, errors }) => {
    const [ title, setTitle ] = useState(initialTitle);
    const [ text, setText ] = useState(initialText);
    const [ submitArgs, setSubmitArgs ] = useState([ "Test Initial Title", "Test Initial Text" ]);

    const setTitleState = (value) => {
        setSubmitArgs((prevSubmitArgs) => [ "Test Typed In Title", prevSubmitArgs[1]]);
        setTitle(value);
    }

    const setTextState = (value) => {
        setSubmitArgs((prevSubmitArgs) => [ prevSubmitArgs[0], "Test Typed In Text" ]);
        setText(value);
    }

    return (
        <>
            <Form submitListener={() => onSubmit(submitArgs[0], submitArgs[1])} submitButtonText={"Submit"}>
                <label className="title" htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" 
                        value={title}
                        onChange={(e) => setTitleState(e.target.value)}
                    />
                </label>
                <TextBox label={"Text"} placeholder={""} value={text} onChange={(value) => setTextState(value)} />
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