import App from './App';
import EditBlogPostForm from "./components/EditBlogPostForm.jsx";
import CreateBlogPostForm from "./components/CreateBlogPostForm.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import LogInPage from "./components/LogInPage.jsx";
import Blogs from "./components/Blogs.jsx";
import { useBlogPostData, updateBlogPut, createBlogPost, deletePost, createAnAccount, logInUser, deleteComment, useBlogsListData } from "./utils/api.jsx";
import { getBearerToken, storeBearerToken } from "./utils/storage.jsx"
import ErrorPage from "./components/ErrorPage.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/posts/:postId/edit",
        element: <EditBlogPostForm  useAllData={useBlogPostData} updateBlogPut={updateBlogPut} getBearerToken={getBearerToken} deletePost={deletePost} deleteComment={deleteComment} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/posts/create",
        element: <CreateBlogPostForm createBlogPost={createBlogPost} getBearerToken={getBearerToken} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/sign-up",
        element: <SignUpPage createAnAccount={createAnAccount} />,
        errorELement: <ErrorPage />
    },
    {
        path: "/log-in",
        element: <LogInPage storeBearerToken={storeBearerToken} logInUser={logInUser} />,
        errorElement: <ErrorPage />
    },
    {
        path: "/posts",
        element: <Blogs useAllData={useBlogsListData} getBearerToken={getBearerToken} />,
        errorElement: <ErrorPage />
    }



    
];


export default routes;