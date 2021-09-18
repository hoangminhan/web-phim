import { Route, Switch } from "react-router";
import "./App.css";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import routes from "./routes";

function App() {
  return (
    <>
      <Header />

      <Switch>
        {routes &&
          routes.map((item, index) => {
            return (
              <Route
                exact={item.exact}
                key={index}
                component={item.component}
                path={item.path}
              />
            );
          })}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
