import App from './App';
import EditBlogPostForm from "./components/EditBlogPostForm.jsx";
import CreateBlogPostForm from "./components/CreateBlogPostForm.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import { useBlogPostData, updateBlogPut, createBlogPost, deletePost } from "./utils/api.jsx";
import { getBearerToken } from "./utils/storage.jsx"

const createAnAccount = () => ({});

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/posts/:postId/edit",
        element: <EditBlogPostForm  useAllData={useBlogPostData} updateBlogPut={updateBlogPut} getBearerToken={getBearerToken} deletePost={deletePost} />
    },
    {
        path: "/posts/create",
        element: <CreateBlogPostForm createBlogPost={createBlogPost} getBearerToken={getBearerToken} />
    },
    {
        path: "/sign-up",
        element: <SignUpPage createAnAccount={createAnAccount} />
    }
];
export default routes;