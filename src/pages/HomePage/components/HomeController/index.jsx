import HomeClass from "@/pages/HomePage/classes/HomeClass";
import HomeControllerEffect from "@/pages/HomePage/components/HomeControllerEffect";

export default function HomeController(props) {
  const model = HomeClass.init();
  const { clicks, effects } = model.getController();

  return <HomeControllerEffect state={model.state} children={props.children} clicks={clicks} effects={effects} />;
}
