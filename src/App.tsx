import { axiosBaseConfig, setUpInterceptors } from "utils";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MainRoute, AuthRoute, NonAuthRoutes } from "navigation";

import { PrivateRoute } from "components";

import "./App.css";


axiosBaseConfig();
setUpInterceptors();

function App() {
  
  return (
    <Router>
      <Switch>
        {AuthRoute.map((item) => (
          <Route
            exact={item.exact}
            render={(props) => <item.Component {...props} />}
            path={item.path}
            key={item.path}
          />
        ))}
        {MainRoute.map((item) => (
          <Route
            exact={item.exact}
            path={item.path}
            render={(props) => (
              <PrivateRoute>
                <item.Component {...props} />
              </PrivateRoute>
            )}
            key={item.path}
          />
        ))}
        {NonAuthRoutes.map((item) => (
          <Route
            exact={item.exact}
            render={(props) => <item.Component {...props} />}
            path={item.path}
            key={item.path}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
