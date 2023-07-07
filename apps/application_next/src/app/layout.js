/* import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme"; */
import "common-lib/styles.scss";
import './globals.css';

/*const AuthStoreProvider = dynamic(() => import('context/AuthStore'), {
  ssr: false,
});
const SoftUIControllerProvider = lazy(() => import("context/SoftUIControllerProvider"));
const StoreProvider = lazy(() => import("context/Store"));*/

export const metadata = {
  title: 'MyPortfolio Application',
  description: 'Description for MyPortfolio Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
