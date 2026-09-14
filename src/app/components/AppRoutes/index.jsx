import { ComponentDisplay } from "@/lib";
import HomePage from "@/pages/HomePage";
import { HashRouter, Routes, Route } from "react-router";

export default function AppRoutes(props) {
  const { context } = props;
  const { app } = context.state;
  return (
    <HashRouter>
      <ComponentDisplay when={!app.isAuthenticated}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ComponentDisplay>
      <ComponentDisplay when={app.isAuthenticated}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ComponentDisplay>
    </HashRouter>
  );
}
