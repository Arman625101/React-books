import "./index.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/genres">Genres</Link>
      <Link to="/authors">Authors</Link>
      <Link to="/books">Books</Link>
    </nav>
  );
};

export default Navbar;
