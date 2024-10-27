import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";

const Blogs = ({ useAllData, getBearerToken }) => {
    const { error, loading, data } = useAllData();

    getBearerToken();

    if (loading) {
        return <h1 className="loading">Loading...</h1>
    }

    const links = [
        {
            name: "Blogs",
            path: "/blogs",
            isCurrentPage: true,
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
        <header>
            <Header links={links} loggedInUser={null} />
        </header>
        {

            data &&
            <>
            <section className="blogs">
                <ul className="blogs-list" aria-label="blogs">
                    { data.blogs.map((blog) => {
                        return <li className="blog" key={blog.id}>
                            <Link to={`/posts/${blog.id}`}>
                                <p className="username">{ blog.username }</p>
                                <h2 className="blog-title">{ blog.title }</h2>
                            </Link>
                        </li>
                    })}
                </ul>
            </section>
            </>

        }

        </>
    )
};


Blogs.propTypes = {
    useAllData: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
}

export default Blogs;