import HomePage from "@/pages/HomePage";
import { HashRouter, Routes, Route } from "react-router";

export default function AppRoutes(props) {
  const { controller } = props;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}
