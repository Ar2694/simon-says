import AppTheme from "../AppTheme";
import AppModel from "../AppModel";
import AppContext from "../AppContext";
import AppRoutes from "../AppRoutes";


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
