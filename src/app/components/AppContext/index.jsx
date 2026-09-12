
import { ComponentContext, useComponentContext as useAppContext } from "asnow-lib";
import React from 'react'
import { useNavigate } from "react-router";


export default function AppContext(props) {
  const didRefreshed = React.useRef(false);
  const navigate = useNavigate();
  const { model } = props;

  return (
    <ComponentContext
      state={model.state}
    
      children={props.children}
    />
  );
}

export { useAppContext };