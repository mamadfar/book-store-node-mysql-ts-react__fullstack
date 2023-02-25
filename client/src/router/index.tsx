import { createBrowserRouter } from "react-router-dom";
import { Books, AddBook, EditBook } from "../pages";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Books/>,
    },
    {
      path: "/add",
      element: <AddBook/>,
    },
    {
      path: "/edit/:id",
      element: <EditBook/>,
    },
  ]);

  export default router;