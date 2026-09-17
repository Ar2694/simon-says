import { useEffect } from "react";
import { ComponentChildren, useController } from "@/lib";

export default function HomeControllerEffect(props) {
  const { state: initialState = null, childProps = {} } = props;
  const { controller } = useController(initialState || {}, props);
  const { simonSayGame } = controller.state ?? {};

  useEffect(() => {
          console.log("simonSayGame", simonSayGame);
    if (!simonSayGame.isPlayerTurn && simonSayGame.hasStarted) {

      if (simonSayGame.currentSequenceIndex === 0) {
        const timer = setInterval(() => {
          controller.loadEffects();
        }, 500);
        return () => clearInterval(timer);
      } else {
        const timer = setInterval(() => {
          controller.loadEffects();
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [simonSayGame.hasStarted, simonSayGame.currentSequenceIndex, simonSayGame.isPlayerTurn]);

  return <ComponentChildren children={props.children} childProps={{ ...childProps, controller }} />;
}
