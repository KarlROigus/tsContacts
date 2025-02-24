
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cyan-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Contacts</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/persons" className="hover:underline">Persons</Link>
        </li>
        <li>
          <Link to="/contacttypes" className="hover:underline">ContactTypes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
