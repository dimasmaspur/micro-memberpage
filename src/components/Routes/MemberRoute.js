import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const MemberRoute = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = localStorage.getItem("SINAU:token");
  console.log(rest);
  localStorage.removeItem("SINAU:redirect");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? (
          <Component {...props} />
        ) : path === "/joined/:class" ? (
          <Redirect to={`/login?path=${location.pathname}`} />
        ) : (
              <Redirect to={`/private?path=${location.pathname}`} />
            )
      }
    />
  );
};

export default withRouter(MemberRoute);
