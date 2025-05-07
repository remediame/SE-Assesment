import { Link } from "react-router";

const NavBar = () => {
  const userId = sessionStorage.getItem("user_id");

  return (
    <header className="container sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle rounded">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <b>Ohiremen</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  {userId === "" || userId === null ? "Login" : "Logout"}
                </Link>
              </li>
              {/* <li className="nav-item">
                {userId === "" || userId === null ? (
                  <button className="login-btn" onClick={openAuthModal}>
                    Login
                  </button>
                ) : (
                  <button className="login-btn " onClick={handleLogout}>
                    Sign Out
                  </button>
                )}
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
