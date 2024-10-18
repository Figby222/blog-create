import PropTypes from "prop-types";

const TextBox = ({ label, placeholder, value, onChange }) => {
    return (
        <>
            <label className="textbox-label">
                { label }
                <textarea value={value}
                className="new-comment-text" 
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}></textarea>
            </label>
        </>
    )
};

TextBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default TextBox;