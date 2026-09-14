import React from "react";
import useController from "@/lib/hooks/useController";

import { ComponentChildren } from "..";

export default function ComponentController(props) {
    const { state: initialState = null, childProps = {} } = props;
    const { controller } = useController(initialState || {}, props);

    return (
        <ComponentChildren children={props.children} childProps={{ ...childProps, controller }} />
    )
}