import React, { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../core/slice/authSlice";
import {
  AccountCircle,
  Logout,
  ManageAccounts,
  TwoWheeler,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

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
          <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center">
            <TwoWheeler style={{ marginRight: "8px", color: "white" }} />
            <span className="text-white">MotoApp</span>
          </NavLink>
          <div className="d-flex align-items-center">
            <Tooltip title={user?.firstName || "Utilisateur"}>
              <div className="text-white me-3 d-flex align-items-center">
                <AccountCircle className="me-1" />
                <span>{user?.firstName || "Utilisateur"}</span>
              </div>
            </Tooltip>

            <Tooltip title="Déconnexion">
              <IconButton onClick={handleLogout} color="inherit">
                <Logout style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
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
              <NavLink
                to="/gestion-compte"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center text-dark ${
                    isActive ? "fw-bold bg-primary text-white rounded px-2" : ""
                  }`
                }
              >
                <ManageAccounts className="me-2" />
                <span className="fw-bold">Gestion des comptes</span>
              </NavLink>
            </li>
            <li className="nav-item mb-3">
              <NavLink
                to="/livraison"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center text-dark ${
                    isActive ? "fw-bold bg-primary text-white rounded px-2" : ""
                  }`
                }
              >
                <TwoWheeler className="me-2" />
                <span className="fw-bold">Livraison</span>
              </NavLink>
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


