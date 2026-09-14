import AppContext from "@/app/components/AppContext";
import AppModel from "@/app/components/AppModel";
import AppRoutes from "@/app/components/AppRoutes";
import AppTheme from "@/app/components/AppTheme";

export default function App() {
  return (
    <AppTheme>
      <AppModel>
        <AppContext>
          <AppRoutes />
        </AppContext>
      </AppModel>
    </AppTheme>
  );
}
