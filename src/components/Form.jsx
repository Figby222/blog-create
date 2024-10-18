import PropTypes from "prop-types";

const Form = ({ submitListener, submitButtonText, children }) => {
    const formSubmitListener = (e) => {
        e.preventDefault();

        submitListener(e);
    }

    return (
        <>
            <form onSubmit={formSubmitListener}>
                { children }
                <button type="submit">{ submitButtonText }</button>
            </form>
        </>
    )
};

Form.propTypes = {
    submitListener: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    children: PropTypes.any
}

export default Form;