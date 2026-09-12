import { ComponentChildren, useModel } from "asnow-lib";
import React from "react";

export default function AppModel(props) {
  const { initModel } = useModel();

  const model = initModel
    .define(["app", "isAuthenticated"], false)
    .define(["app", "user"], null)
    .define(["app", "isLoading"], true);

  return (
    <ComponentChildren children={props.children} childProps={{ model }} />
  )
}
