import "@rob097/common-lib/styles.scss";
import { AuthStoreProvider } from "context/AuthStore";
import { createRoot } from 'react-dom/client';
import CustomRouterProvider from "./Routes";
import "./styles/index.scss";
import i18n from "../assets/i18n/i18n";
import { SoftUIControllerProvider } from "context/DashboardStore";
import theme from "@rob097/common-lib/assets/theme";
import { ThemeProvider } from "@mui/material";

const App = () => {
  console.debug("i18n for auth initialized: %O", i18n);
  return (
    // Theme providers
    <SoftUIControllerProvider>
      <ThemeProvider theme={theme}>

        {/* Store providers */}
        <AuthStoreProvider>

          {/* Routes */}
          <CustomRouterProvider />

        </AuthStoreProvider>

      </ThemeProvider>
    </SoftUIControllerProvider>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);