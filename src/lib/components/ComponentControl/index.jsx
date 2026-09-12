import React  from "react";
import useControl from "@/lib/hooks/useControl";
import ComponentChildren from "../ComponentChildren";

export default function ComponentControl(props) {
    const { state: initialState = null, childProps = {} } = props;
    const { control } = useControl(initialState || {}, props);

    return (
        <ComponentChildren children={props.children} childProps={{ control, ...childProps }} />
    )
}
