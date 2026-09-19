import { createContext, useContext } from "react";
import { ComponentChildren, useController } from "asnow-lib";
import AppClass from "@/app/classes/AppClass";

const Context = createContext(null);

export default function AppContext(props) {
  const model = AppClass.init();
  const { controller } = useController(model.state, {});

  return (
    <Context.Provider value={{ controller }}>
      <ComponentChildren children={props.children} childProps={{ controller }} />
    </Context.Provider>
  )
}

export const useAppContext = () => useContext(Context);

