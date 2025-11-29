import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./routes/home";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
