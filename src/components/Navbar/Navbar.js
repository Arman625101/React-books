import "./index.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/genres">Genres</NavLink>
      <NavLink to="/authors">Authors</NavLink>
      <NavLink to="/books">Books</NavLink>
    </nav>
  );
};

export default Navbar;
