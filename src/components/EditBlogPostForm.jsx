import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import BlogForm from "./BlogForm.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form.jsx";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";

const EditBlogPostForm = ({ useAllData, updateBlogPut, getBearerToken, deletePost, deleteComment }) => {
    const { postId } = useParams();
    const { error, loading, data} = useAllData(postId);
    const [ errors, setErrors ] = useState([]);
    
    if (loading) {
        return <h1 className="loading">Loading</h1>
    }

    if (error) {
        return <h1 className="error">An error has occurred</h1>
    }

    const onSubmit = async (title, text, isPublishInputChecked) => {
        const bearerToken = getBearerToken();

        const response = await updateBlogPut(postId, title, text, isPublishInputChecked, bearerToken);

        response.errors && setErrors(response.errors);
    }

    const onDelete = async () => {
        const bearerToken = getBearerToken();

        const response = await deletePost(postId, bearerToken);
    }

    const onDeleteComment = async (commentId) => {
        const bearerToken = getBearerToken();

        const response = await deleteComment(postId, commentId, bearerToken)
    }

    const links = [
        {
            name: "Blogs",
            path: "/posts",
            isCurrentPage: false,
        },
        {
            name: "Create",
            path: "/posts/create",
            isCurrentPage: false,
        },
        {
            name: "Sign Up",
            path: "/sign-up",
            isCurrentPage: false,
        },
        {
            name: "Log In",
            path: "/log-in",
            isCurrentPage: false,
        }
    ]

    return (
        <>
            <Header links={links} loggedInUser={null} />
            <BlogForm onSubmit={(title, text, isPublishInputChecked) => onSubmit(title, text, isPublishInputChecked)} initialTitle={data.title} initialText={data.text} initialPublishedStatus={data.published} errors={errors} />
            <Form submitListener={() => onDelete()} submitButtonText={"Delete"}>       
            </Form>
            <section className="comments">
                <ul className="comments-ul">
                    { data.comments.map((comment) => {
                        return <li className="comment-li" key={comment.id}>
                            <h2 className="comment-creator">{ comment.creator }</h2>
                            <p className="comment-text">{ comment.text }</p>
                            <Form submitListener={() => onDeleteComment(comment.id)} submitButtonText={"Delete Comment"}></Form>
                        </li>
                    })}
                </ul>
            </section>
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

export default EditBlogPostForm;