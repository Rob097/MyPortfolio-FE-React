import "@common-lib/styles.scss";
import { createRoot } from 'react-dom/client';
import Auth from "./Auth";
import "./styles/index.scss";

const App = () => {

  return (
    <>
      <h2>This is Auth App.js</h2>
      <p>
        {process.env.REACT_APP_BASE_URL} <code>src/App.js</code> and save to reload.
      </p>
      <Auth />
    </>
  )
};
const root = createRoot(document.getElementById("app"));
root.render(<App />);