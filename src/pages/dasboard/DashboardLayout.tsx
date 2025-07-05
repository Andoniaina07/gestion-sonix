// import React, { ReactNode } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { logout } from "../../core/slice/authSlice";

// interface Props {
//   children: ReactNode;
// }

// const DashboardLayout: React.FC<Props> = ({ children }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.auth.user);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar fixed-top navbar-dark bg-dark d-flex justify-content-between px-3">
//         <div className="navbar-brand d-flex align-items-center">
//           <Link to="/acceuil" className="text-white text-decoration-none d-flex align-items-center">
//             <img src="/images/logo-mini.svg" alt="logo" width={30} className="me-2" />
//             <span className="fw-bold">MyApp</span>
//           </Link>
//         </div>
//         <div className="d-flex align-items-center text-white">
//           <span className="me-3">{user?.firstName || user?.email || "Utilisateur"}</span>
//           <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Déconnexion</button>
//         </div>
//       </nav>

//       {/* Sidebar + Content */}
//       <div className="d-flex">
//         {/* Sidebar */}
//         <div className="bg-light border-end position-fixed" style={{ width: "240px", top: "56px", bottom: 0 }}>
//           <div className="list-group list-group-flush">
//             <Link to="/acceuil" className="list-group-item list-group-item-action">Accueil</Link>
//             <Link to="/gestion-compte" className="list-group-item list-group-item-action">Gestion Compte</Link>
//             <Link to="/intervenant" className="list-group-item list-group-item-action">Réservation</Link>
//             <Link to="/entretien" className="list-group-item list-group-item-action">Course</Link>
//           </div>
//         </div>

//         {/* Content */}
//         <main style={{ marginLeft: "240px", padding: "80px 24px 24px", width: "100%" }}>
//           {children}
//         </main>
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;


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
            {/* <img src={logo} alt="Logo" style={{ height: 35, marginRight: 10 }} /> */}
            <span>MotoApp</span>
          </Link>
          <div className="d-flex align-items-center">
            <span className="text-white me-3">
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
          style={{ top: "56px", width: "220px", bottom: 0 }}
        >
          <ul className="nav flex-column pt-3 px-2">
            <li className="nav-item mb-2">
              <Link to="/acceuil" className="nav-link text-dark">
                🏠 Accueil
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/gestion-compte" className="nav-link text-dark">
                👤 Gestion des comptes
              </Link>
            </li>
            {/* <li className="nav-item mb-2">
              <Link to="/intervenant" className="nav-link text-dark">
                📅 Réservation
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/entretien" className="nav-link text-dark">
                🛠️ Course
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Content */}
        <main
          className="container-fluid"
          style={{ marginLeft: "220px", paddingTop: "80px" }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
