import React, { createContext, useContext } from "react";
import { useControl } from "@/lib/hooks";
import { ComponentChildren } from "..";

export const Context = createContext(null);

export default function ComponentContext(props) {
    const { state: initialState = null } = props;
    const { control: context } = useControl(initialState || {}, props);

    return (
        <Context.Provider value={{ context }}>
            <ComponentChildren children={props.children} childProps={{ context }} />
        </Context.Provider>
    )

}

export const useComponentContext = () => useContext(Context);