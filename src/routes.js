import PopularPage from "./pages/PopularPage";
import ShowPage from "./pages/ShowPage";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import NotFound from "./component/NotFound";

const routes = [
  {
    path: "/",
    component: () => <HomePage />,
    exact: true,
  },
  {
    path: "/tv-show",
    component: () => <ShowPage />,
    exact: false,
  },
  {
    path: "/movies",
    component: () => <MoviesPage />,
    exact: false,
  },
  {
    path: "/new-popular",
    component: () => <PopularPage />,
    exact: false,
  },
  {
    path: "",
    component: () => <NotFound />,
    exact: false,
  },
];

export default routes;
