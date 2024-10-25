import App from './App';
import EditBlogPostForm from "./components/EditBlogPostForm.jsx";
import CreateBlogPostForm from "./components/CreateBlogPostForm.jsx";
import { useBlogPostData, updateBlogPut, createBlogPost } from "./utils/api.jsx";
import { getBearerToken } from "./utils/storage.jsx"


const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/posts/:postId/edit",
        element: <EditBlogPostForm  useAllData={useBlogPostData} updateBlogPut={updateBlogPut} getBearerToken={getBearerToken} />
    },
    {
        path: "/posts/create",
        element: <CreateBlogPostForm createBlogPost={createBlogPost} getBearerToken={getBearerToken} />
    }
];



export default routes;