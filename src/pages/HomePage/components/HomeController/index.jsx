import HomeClass from "@/pages/HomePage/classes/HomeClass";
import { useController, ComponentChildren } from "asnow-lib";
import { useEffect } from "react";

export default function HomeController(props) {
  const model = HomeClass.init();
  const { controller } = useController(model.state, model.getController());
  const { simonSayGame } = controller.state ?? {};

  useEffect(() => {

    if (!simonSayGame.isPlayerTurn && simonSayGame.hasStarted) {
      if (simonSayGame.currentSequenceIndex === 0) {
        const timer = setInterval(() => {
          controller.runEffects();
        }, 500);
        return () => clearInterval(timer);
      } else {
        const timer = setInterval(() => {
          controller.runEffects();
        }, 1000);
        return () => clearInterval(timer);
      }
    }

  }, [simonSayGame.hasStarted, simonSayGame.currentSequenceIndex, simonSayGame.isPlayerTurn]);

  return <ComponentChildren children={props.children} childProps={{ controller }} />;
}
