import { useEffect } from "react";
import useController from "@/lib/hooks/useController";
import { ComponentChildren } from "..";

export default function ComponentController(props) {
  const { state: initialState = null, childProps = {} } = props;
  const { controller } = useController(initialState || {}, props);

  useEffect(() => {
    if (controller !== null && controller !== undefined) {
      controller.loadEffects();
    }
  }, []);

  return <ComponentChildren children={props.children} childProps={{ ...childProps, controller }} />;
}
