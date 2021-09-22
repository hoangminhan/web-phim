import PopularPage from "./pages/PopularPage";
import ShowPage from "./pages/ShowPage";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import NotFound from "./component/NotFound";
import DetailPage from "./pages/DetailPage";

const routes = [
  {
    path: "/",
    component: () => <HomePage />,
    exact: true,
  },

  {
    path: "/tv-show",
    component: () => <ShowPage />,
    exact: true,
  },
  {
    path: "/tv-show/:name",
    component: () => <DetailPage />,
    exact: false,
  },
  {
    path: "/movies",
    component: () => <MoviesPage />,
    exact: true,
  },
  {
    path: "/movies/:name",
    component: () => <DetailPage />,
    exact: false,
  },
  {
    path: "/new-popular",
    component: () => <PopularPage />,
    exact: true,
  },
  {
    path: "/new-popular/:name",
    component: () => <DetailPage />,
    exact: false,
  },
  {
    path: "",
    component: () => <NotFound />,
    exact: false,
  },
];

export default routes;
