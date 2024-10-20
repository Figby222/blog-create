import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import Form from "./Form.jsx";

const CreateBlogPostForm = ({ createBlogPost }) => {

    return (
        <>
            <Form submitListener={() => createBlogPost("Test Title", "Test Text")} submitButtonText={"Submit"}>
                <label className="title" htmlFor="title">
                    Title
                    <input type="text" name="title" id="title" />
                </label>
                <TextBox label={"Text"} placeholder={""} value={""} onChange={() => {}} />
            </Form>
        </>
    )
};

CreateBlogPostForm.propTypes = {
    createBlogPost: PropTypes.func.isRequired
};

export default CreateBlogPostForm;