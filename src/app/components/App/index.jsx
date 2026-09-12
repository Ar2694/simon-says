import AppContext from "../AppContext";
import AppModel from "../AppModel";
import AppRoutes from "../AppRoutes";
import AppTheme from "../AppTheme";


export default function App() {
  return (
    <AppTheme>
      <AppModel>
        <AppContext>
          <AppRoutes />
        </AppContext>
      </AppModel>
    </AppTheme>
  )
}
