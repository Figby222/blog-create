import PropTypes from "prop-types";
import TextBox from "./TextBox.jsx";
import { useState } from "react";

const EditBlogPostForm = ({ useAllData, updateBlogPut }) => {
    const { error, loading, data} = useAllData();

    if (loading) {
        return <h1 className="loading">Loading</h1>
    }

    if (error) {
        return <h1 className="error">An error has occurred</h1>
    }

    const [ title, setTitle ] = useState(data.title);
    const [ text, setText ] = useState(data.text);

    return (
        <>
            <label className="title" htmlFor="title">
                Title
                <input type="text" name="title" id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <TextBox label={"Text"} placeholder={""} 
                value={text} 
                onChange={(value) => setText(value)} 
            />
        </>
    )
};
EditBlogPostForm.propTypes = {
    useAllData: PropTypes.func.isRequired,
    updateBlogPut: PropTypes.func.isRequired
};

export default EditBlogPostForm;