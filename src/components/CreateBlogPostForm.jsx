import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import Form from "./Form.jsx";

const CreateBlogPostForm = ({ createBlogPost }) => {
    createBlogPost();
    return (
        <>
            <Form submitListener={() => {}} submitButtonText={"Submit"}>
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