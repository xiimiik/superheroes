import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import { getHero, getHeroes } from "../api/fetchHeroes";
import LayoutPage from "../pages/LayoutPage";
import SuperheroPage from "../pages/SuperheroPage";

export const routs = {
  MAIN: "/",
  HERO_PAGE: ":heroId",
};

export const router = createBrowserRouter([
  {
    path: routs.MAIN,
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
        loader: getHeroes,
      },
      {
        path: routs.HERO_PAGE,
        element: <SuperheroPage />,
        loader: getHero,
      },
    ],
  },
]);
