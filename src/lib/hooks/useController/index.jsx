import { ControlClass } from "@/lib/classes";
import { useEffect, useRef, useState } from "react";


export default function useController(initialState, props) {
    const { calls, clicks, changes, effects, controllerClass = null } = props ?? {}
    const [state, setState] = useState(initialState ?? {});
    const controllerRef = useRef(null);

    if (!controllerRef.current) {
        const controllerInstance = controllerClass ?? ControlClass;
        const controller = controllerInstance.init(state, setState, { clicks, changes, effects, calls }).build();
        controllerRef.current = controller;
    } else {
        controllerRef.current.state = state;
        controllerRef.current.setState = setState;
    }

    const controllerProps = { controller: controllerRef.current }

    return controllerProps;
}

