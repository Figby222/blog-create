import PropTypes from "prop-types";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = ({}) => {
    const error = useRouteError();
    
    return (
        <>
            <h1 className="main-heading">
                { error.status } - { error.message }
            </h1>
            <Link className="home-link" to="/">
                Home
            </Link>
        </>
    )
};

export default ErrorPage;