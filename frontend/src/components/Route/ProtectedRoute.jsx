import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import MainScreen from "../MainScreen";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <MainScreen>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </MainScreen>
  );
};

export default ProtectedRoute;
