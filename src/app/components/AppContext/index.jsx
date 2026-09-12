
import { ComponentContext, useComponentContext as useAppContext } from "asnow-lib";
import React from 'react'
import { UserAPI } from "@/api"
import { useNavigate } from "react-router";


export default function AppContext(props) {
  const didRefreshed = React.useRef(false);
  const navigate = useNavigate();
  const { model } = props;

  const onRefresh = async (state, setState) => {
    let updatedModel = model.set(state);

    if (didRefreshed.current) {
      return;
    }

    didRefreshed.current = true;


    updatedModel = updatedModel.update(["app", "isLoading"], true);
    setState(updatedModel.state);

    const user = await UserAPI.refreshUser();

    if (user.isOk) {
      updatedModel = updatedModel.update(["app", "user"], user.data).update(["app", "isAuthenticated"], true);
    } else {
      updatedModel = updatedModel.update(["app", "user"], null).update(["app", "isAuthenticated"], false);
    }
    updatedModel = updatedModel.update(["app", "isLoading"], false);
    setState(updatedModel.state);



  }

  const onLogin = async (state, setState, val) => {
    const user = await UserAPI.userLogin(val);

    if (user.isOk) {
      return user;
    } else {

      return {
        message: "* Invalid login credentials",
        hasError: true
      };
    }

  }

  const onReload = async (state, setState) => {
    let updatedModel = model.set(state);
    updatedModel = updatedModel.update(["app", "isLoading"], true);
    setState(updatedModel.state);
    navigate(".", { replace: true });
    const user = await UserAPI.refreshUser();

    if (user.isOk) {
      updatedModel = updatedModel
        .update(["app", "user"], user.data)
        .update(["app", "isAuthenticated"], true);

    } else {
      updatedModel = updatedModel
        .update(["app", "user"], null)
        .update(["app", "isAuthenticated"], false);

    }
    updatedModel = updatedModel.update(["app", "isLoading"], false);
    setState(updatedModel.state);
  }

  const onLogout = async (state, setState) => {
    let updatedModel = model.set(state);
    updatedModel = updatedModel.update(["app", "isLoading"], true);
    setState(updatedModel.state);

    const token = updatedModel.get(["app", "user", "accessToken"]);
    await UserAPI.userLogout(token);

    updatedModel = updatedModel
      .update(["app", "user"], null)
      .update(["app", "isAuthenticated"], false)
      .update(["app", "isLoading"], false);
    // Any cleanup code can go here

    setState(updatedModel.state);
  }

  const onNavigate = (s, ss, path) => {
    navigate(path);
  };


  return (
    <ComponentContext
      state={model.state}
      onClicks={{ onLogout, onNavigate }}
      onCalls={{ onLogin, onReload, onRefresh, onNavigate }}
      onEffects={{ onRefresh }}
      children={props.children}
    />
  );
}

export { useAppContext };