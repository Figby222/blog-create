import App from './App';
import EditBlogPostForm from "./components/EditBlogPostForm.jsx";
import CreateBlogPostForm from "./components/CreateBlogPostForm.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import { useBlogPostData, updateBlogPut, createBlogPost, deletePost, createAnAccount } from "./utils/api.jsx";
import { getBearerToken } from "./utils/storage.jsx"

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