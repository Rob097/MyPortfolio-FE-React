import "common-lib/styles.scss";
import { createRoot } from 'react-dom/client';
import i18n from "../assets/i18n/i18n";
import "./index.css";

const App = () => {
  console.debug("i18n for application initialized: %O", i18n);
  return (
    <div className="container">
      <h1 className="mt-4">CIAO</h1>
    </div>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);