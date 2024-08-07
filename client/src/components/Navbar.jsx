import { RiMenu2Fill } from 'react-icons/ri';
import {
  FaMoon,
  FaRegUserCircle,
  FaSearch,
  FaSun,
  FaUserCheck,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/Context';

const Navbar = () => {
  const { theme, handleTheme, user, dispatch } = useContext(Context);
  const PF = 'http://localhost:5000/images/';

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RiMenu2Fill className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          DBlog
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Theme switcher */}
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value={theme}
            className="theme-controller toggle col-span-2 col-start-1 row-start-1 bg-base-content"
            checked={theme === 'dim'}
            onChange={handleTheme}
            aria-label="Theme Switcher"
          />
          <FaSun className="col-start-1 row-start-1 fill-base-100 stroke-base-100" />
          <FaMoon className="col-start-2 row-start-1 fill-base-100 stroke-base-100" />
        </label>
        {/* Search */}
        <button className="btn btn-circle btn-ghost">
          <FaSearch className="h-5 w-5" />
        </button>
        <div className="dropdown dropdown-end">
          {user ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-8 rounded-full">
                  {user.profilePic ? (
                    <img src={PF + user.profilePic} alt={user.username} />
                  ) : (
                    <FaUserCheck className="h-full w-full" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/write">Write</Link>
                </li>
                <li className="btn btn-error" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </>
          ) : (
            <>
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-8 rounded-full">
                  <FaRegUserCircle className="h-full w-full" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to="/login" className="justify-between">
                    Login
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
