import { useRef } from "react";
import { ComponentController, StateClass } from "@/lib";
import HomeClass from "@/pages/HomePage/classes/HomeClass";

export default function HomeController(props) {
  const model = HomeClass.init();
  const btnRefOne = useRef(null);
  const btnRefTwo = useRef(null);
  const btnRefThree = useRef(null);
  const btnRefFour = useRef(null);

  const clicks = {
    startGame: (state, setState) => {
      model.bind(state, setState).startGame().commit();
    },
    resetGame: (state, setState) => {
      model.bind(state, setState).resetGame().commit();
    },
    showInfoModal: (state, setState) => {
      console.log("showInfoModal clicked");
      // Implement the logic to show the info modal here
    },
    playGame: (state, setState) => {
      model.bind(state, setState).playGame().commit();
    },
    targetBtn: (state, setState, prop) => {
      const { isPlayerTurn } = state;

      if (prop === "1") {
        model.bind(state, setState).validatePlayerMove(1).commit();
      } else if (prop === "2") {
        model.bind(state, setState).validatePlayerMove(2).commit();
      } else if (prop === "3") {
        model.bind(state, setState).validatePlayerMove(3).commit();
      } else if (prop === "4") {
        model.bind(state, setState).validatePlayerMove(4).commit();
      }
    },
  };

  const childProps = {
    btnRefOne,
    btnRefTwo,
    btnRefThree,
    btnRefFour,
  };

  return <ComponentController state={model.state} children={props.children} childProps={childProps} clicks={clicks} />;
}
