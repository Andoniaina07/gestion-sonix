import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../core/slice/authSlice";
// import logo from "../../assets/logo.png"; 

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
            {/* <img src={logo} alt="Logo" style={{ height: 34, marginRight: 10 }} /> */}
            <span>MotoApp</span>
          </Link>
          <div className="d-flex align-items-center">
            <span className="text-white me-4">
              {user?.firstName || "Utilisateur"}
            </span>
            <button onClick={handleLogout} className="btn btn-sm btn-light">
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="bg-light position-fixed"
          style={{ top: "55px", width: "220px", bottom: 0 }}
        >
          <ul className="nav flex-column pt-4 px-2">
            <li className="nav-item mb-3">
              <Link to="/acceuil" className="nav-link text-dark">
                🏠 Accueil
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/gestion-compte" className="nav-link text-dark">
                👤 Gestion des comptes
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/intervenant" className="nav-link text-dark">
                📅 Livraison 
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/entretien" className="nav-link text-dark">
                🛠️ Course
              </Link>
            </li>
          </ul>
        </div>

        {/* Content */}
        <main
          className="container-fluid"
          style={{ marginLeft: "219px", paddingTop: "80px" }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
