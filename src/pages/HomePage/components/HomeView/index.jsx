import SimonSaysView from "@/pages/HomePage/components/HomeView/components/SimonSaysView";
import PageView from "@/shared/views/PageView";

export default function HomeView(props) {
  const { controller } = props;

  return (
    <PageView>
      <SimonSaysView controller={controller} />
    </PageView>
  );
}
