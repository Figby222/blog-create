import PropTypes from "prop-types";
import Form from "./Form.jsx";
import { useState } from "react";
import Errors from "./Errors.jsx"
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "../styles/SignUpPage.css";

const SignUpPage = ({ createAnAccount }) => {
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const navigate = useNavigate();

    const handleFormSubmission = async (e,username, email, password, confirmPassword) => {
        e.preventDefault();
        
        const response = await createAnAccount(username, email, password, confirmPassword);
        
        if (response.errors) {
            setErrors(response.errors);
            return;
        }

        navigate("/log-in");
    }

    const links = [
        {
            name: "Blogs",
            path: "/",
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
            isCurrentPage: true,
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
            <main className="SignUpPage-main">
                <form className="SignUpPage-form" submitListener={(e) => handleFormSubmission(e, username, email, password, confirmPassword)} submitButtonText={"Submit"}>
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
                    <button type="submit" className="SignUpPage-submit">Submit</button>
                </form>
            </main>
        </>
    )
};

SignUpPage.propTypes = {
    createAnAccount: PropTypes.func.isRequired,
}

export default SignUpPage;