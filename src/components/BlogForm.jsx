import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import { useState } from "react";
import Form from "./Form.jsx";
import Errors from "./Errors.jsx";

const BlogForm = ({ onSubmit, initialTitle, initialText, initialPublishedStatus, errors }) => {
    const [ title, setTitle ] = useState(initialTitle);
    const [ text, setText ] = useState(initialText);
    const [ publishInputChecked, setPublishInputChecked ] = useState(initialPublishedStatus);

    const onFormSubmit = (e) => {
        e.preventDefault();

        onSubmit(title, text, publishInputChecked);
    }

    return (
        <>
            <form className="BlogForm-form" onSubmit={(e) => onFormSubmit(e)}>
                <section className="errors" style={{ display: errors.length ? "block" : "none" }}>
                    <Errors errors={errors} />
                </section>
                <label className="title" htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className="publish-status" htmlFor="publish-status">
                    Publish
                    <input type="checkbox" name="publish_status" id="publish-status"
                        checked={publishInputChecked}
                        onChange={(e) => setPublishInputChecked(e.target.checked)}
                    />
                </label>
                <TextBox label={"Text"} placeholder={""} value={text} onChange={(value) => setText(value)} />
                <button type="submit">Submit</button>
            </form>
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