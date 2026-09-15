import { useEffect } from "react";
import { ComponentChildren, useController } from "@/lib";


export default function HomeControllerEffect(props) {
  const { state: initialState = null, childProps = {} } = props;
  const { controller } = useController(initialState || {}, props);
  const { simonSayGame } = controller.state ?? {};

  useEffect(() => {
    if (controller !== null && controller !== undefined) {

      if (!simonSayGame.isPlayerTurn && simonSayGame.hasStarted) {
        console.log(`useEffect triggered: hasStarted=${simonSayGame.hasStarted}, currentSequenceIndex=${simonSayGame.currentSequenceIndex}`);

       const timer = setInterval(() => {
          controller.loadEffects();
        }, 1000); 
        return () => clearInterval(timer);
      }
    }
  }, [ simonSayGame.hasStarted, simonSayGame.currentSequenceIndex]);

  return <ComponentChildren children={props.children} childProps={{ ...childProps, controller }} />;
}
