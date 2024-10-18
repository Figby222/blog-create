import PropTypes from "prop-types";

const Errors = ({ errors }) => {
    return (
        <>
            <ul className="errors">
                { errors.map((error) => {
                    return <li className="error" key={error.message}>
                        { error.message }
                    </li>
                })}
            </ul>
        </>
    )
};

Errors.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string
    }))
}

export default Errors;