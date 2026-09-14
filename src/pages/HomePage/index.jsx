import HomeController from "@/pages/HomePage/components/HomeController";
import HomeModel from "@/pages/HomePage/components/HomeModel";
import HomeView from "@/pages/HomePage/components/HomeView";

export default function HomePage() {
  return (
    <HomeModel>
      <HomeController>
        <HomeView />
      </HomeController>
    </HomeModel>
  );
}
