import App from './App';
import EditBlogPostForm from "./components/EditBlogPostForm.jsx";
import { useBlogPostData, updateBlogPut } from "./utils/api.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/posts/:postId/edit",
        element: <EditBlogPostForm  useAllData={useBlogPostData} updateBlogPut={updateBlogPut} />
    }
];

export default routes;