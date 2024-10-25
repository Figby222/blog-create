import PropTypes from "prop-types";

const Errors = ({ errors }) => {
    return (
        <>
            <ul className="errors">
                { errors.map((error) => {
                    return <li className="error" key={error.msg}>
                        { error.msg }
                    </li>
                })}
            </ul>
        </>
    )
};

Errors.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
        msg: PropTypes.string
    }))
}

export default Errors;