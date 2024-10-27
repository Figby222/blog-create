import PropTypes from "prop-types";
import Form from "./Form.jsx";
import { useState } from "react";
import Errors from "./Errors.jsx"
import { Link } from "react-router-dom";

const SignUpPage = ({ createAnAccount }) => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const handleFormSubmission = async (username, email, password, confirmPassword) => {
        const response = await createAnAccount(username, email, password, confirmPassword);
        
        response.errors && setErrors(response.errors);
    }

    return (
        <>
            <Link>Create</Link>
            <Form submitListener={() => handleFormSubmission(username, email, password, confirmPassword)} submitButtonText={"Submit"}>
                <div className="username-container">
                    <label htmlFor="username" className="username">
                        Username
                        <input type="text" name="username" id="username" 
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <section className="errors">
                        <Errors errors={errors.filter((error) => error.path.toLowerCase() === "username")} />
                    </section>
                </div>
                <div className="email-container">
                    <label htmlFor="email" className="email">
                        Email
                        <input type="text" name="email" id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <section className="errors">
                            <Errors errors={errors.filter((error) => error.path.toLowerCase() === "email")} />
                        </section>
                    </label>
                </div>
                <div className="password-container">
                    <label htmlFor="password" className="password">
                        Password
                        <input type="password" name="password" id="password" 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <section className="errors">
                        <Errors errors={errors.filter((error) => error.path.toLowerCase() === "password")} />
                    </section>
                </div>
                <div className="confirm-password-container">
                    <label htmlFor="confirm-password" className="confirm-password">
                        Confirm Password
                        <input type="password" name="confirm_password" id="confirm-password" 
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <section className="errors">
                        <Errors errors={errors.filter((error) => error.path.toLowerCase() === "confirm_password")} />
                    </section>
                </div>

            </Form>
        </>
    )
};

SignUpPage.propTypes = {
    createAnAccount: PropTypes.func.isRequired,
}

export default SignUpPage;