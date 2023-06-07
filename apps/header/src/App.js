import {createRoot} from 'react-dom/client';
import "./index.css";
import "common-lib/styles.scss"


const App = () => (
  <div className="container">
    <h1 className="text-3xl font-bold underline">Name: header</h1>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
const root = createRoot(document.getElementById("app"));
root.render(<App />);