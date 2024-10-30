import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "../styles/Blogs.css"

const Blogs = ({ useAllData, getBearerToken }) => {
    const bearerToken = getBearerToken();

    const { error, loading, data } = useAllData(bearerToken);

    const navigate = useNavigate();

    if (loading) {
        return <h1 className="loading">Loading...</h1>
    }

    if (error) {
        if (error.status === 401) {
            navigate("/log-in");
            return;
        }
        throw error;
    }

    const links = [
        {
            name: "Blogs",
            path: "/",
            isCurrentPage: true,
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
        <main>
            {

                data &&
                <>
                <section className="blogs">
                    <ul className="blogs-list" aria-label="blogs">
                        { data.blogs.map((blog) => {
                            return <li className="blog" key={blog.id}>
                                <Link to={`/posts/${blog.id}/edit`} className="blog-link">
                                    <p className="username">{ blog.creator.username }</p>
                                    <h2 className="blog-title">{ blog.title }</h2>
                                    <p className="published">{ blog.published ? "Published" : "Unpublished" }</p>
                                </Link>
                            </li>
                        })}
                    </ul>
                </section>
                </>

            }
        </main>

        </>
    )
};


Blogs.propTypes = {
    useAllData: PropTypes.func.isRequired,
    getBearerToken: PropTypes.func.isRequired,
}

export default Blogs;