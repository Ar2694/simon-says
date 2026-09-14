import SimonSaysView from "@/pages/HomePage/components/HomeView/components/SimonSaysView";
import PageView from "@/shared/views/PageView";

export default function HomeView(props) {
 
  return (
  <PageView>
    <SimonSaysView {...props} />
  </PageView>
  );
}
