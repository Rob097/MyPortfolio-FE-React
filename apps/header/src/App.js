import { createRoot } from 'react-dom/client';
import "./index.css";
import "common-lib/styles.scss"
import i18n from "../assets/i18n/i18n";
import Header from './Header';

const App = () => {
  console.debug("i18n for header initialized: %O", i18n);
  return (
    <div className="container">
      <Header />
    </div>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);