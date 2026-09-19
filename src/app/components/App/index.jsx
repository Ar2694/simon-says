import AppContext from "@/app/components/AppContext";
import AppRoutes from "@/app/components/AppRoutes";
import AppTheme from "@/app/components/AppTheme";

export default function App() {
  return (
    <AppTheme>
      <AppContext>
        <AppRoutes />
      </AppContext>
    </AppTheme>
  );
}
