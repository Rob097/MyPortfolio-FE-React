import "./index.css";

const Header = ({ count = 0 }) => (
  <header>
    <p className="text-3xl font-bold underline">Remote Header / count: {count}</p>
  </header>
);

export default Header;