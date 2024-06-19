import React, { Fragment } from "react";

const LoadingComponent = ({ dependencies, children }) => {
  const allDefined = dependencies.every(
    (dependency) => dependency !== undefined
  );

  if (allDefined) {
    return children();
  } else {
    return <Fragment>Loading...</Fragment>;
  }
};

export default LoadingComponent;
