import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tv from "./pages/Tv";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":movieId",
            element: <Home />
          }
        ]
      },
      {
        path: "tv",
        element: <Tv />,
        children: [
          {
            path: ":tvId",
            element: <Tv />
          }
        ]
      },
      {
        path: "search/:keyword",
        element: <Search />
      }
    ]
  }
]);

export default router;
