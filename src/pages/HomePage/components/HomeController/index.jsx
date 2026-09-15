import { useRef } from "react";
import { ComponentController, StateClass } from "@/lib";
import HomeClass from "@/pages/HomePage/classes/HomeClass";
import HomeControllerEffect from "@/pages/HomePage/components/HomeControllerEffect";

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

    targetBtn: (state, setState, prop) => {
  
      console.log(`targetBtn clicked with prop: ${prop}`);

      if (prop === "1") {
        model.set(["simonSayGame", "btn1", "active"], true).commit();
        setTimeout(() => {
          model.set(["simonSayGame", "btn1", "active"], false).commit();
        }, 500);
      } else if (prop === "2") {
        model.set(["simonSayGame", "btn2", "active"], true).commit();
        setTimeout(() => {
          model.set(["simonSayGame", "btn2", "active"], false).commit();
        }, 500);
      } else if (prop === "3") {
        model.set(["simonSayGame", "btn3", "active"], true).commit();
        setTimeout(() => {
          model.set(["simonSayGame", "btn3", "active"], false).commit();
        }, 1000);
      } else if (prop === "4") {
        model.set(["simonSayGame", "btn4", "active"], true).commit();
        setTimeout(() => {
          model.set(["simonSayGame", "btn4", "active"], false).commit();
        }, 1000);
      }
    },
  };

  const effects = {
    playSequence: (state, setState) => {
      const clickBtn = (step, index) => {
        console.log(`Clicking button for step ${step} at index ${index}`, step===1);
        if (step === 1) {
          btnRefOne.current?.click();
        } else if (step === 2) {
          btnRefTwo.current?.click();
        } else if (step === 3) {
          btnRefThree.current?.click();
        } else if (step === 4) {
          btnRefFour.current?.click();
        }
      };

   
      model.bind(state, setState).playSequence(clickBtn).commit();
    },
  };

  const childProps = {
    btnRefOne,
    btnRefTwo,
    btnRefThree,
    btnRefFour,
  };

  return <HomeControllerEffect state={model.state} children={props.children} childProps={childProps} clicks={clicks} effects={effects} />;
}
