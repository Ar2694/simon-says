import { ComponentChildren, StateClass } from "@/lib";

export default function HomeModel(props) {
  const model = StateClass.init({
    simonSayGame: {
      sequence: [],
      currentLevel: 0,
      isPlayerTurn: false,
    },
  });

  return <ComponentChildren children={props.children} childProps={{ model }} />;
}
