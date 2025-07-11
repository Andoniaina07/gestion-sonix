import React, { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../core/slice/authSlice";
import {
  AccountCircle,
  Logout,
  ManageAccounts,
  TwoWheeler,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  children: ReactNode;
}

// Icône moto SVG personnalisée (pour la navbar uniquement)
const MotoNavbarIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 28,
  color = "white",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    style={{ marginRight: "8px" }}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20.57 14.86C21.44 13.94 22 12.78 22 11.5 22 8.46 19.54 6 16.5 6c-.92 0-1.79.23-2.56.64l-2.3-2.3a.996.996 0 10-1.41 1.41l.95.95-1.42 1.41-2.04-2.04a.996.996 0 10-1.41 1.41l1.25 1.25A5.478 5.478 0 006 11.5c0 .93.23 1.79.64 2.56L3.11 18.6c-.4.4-.4 1.05 0 1.45.2.2.45.3.71.3s.51-.1.71-.29l3.53-3.53c.77.4 1.63.63 2.56.63 1.28 0 2.44-.56 3.36-1.43l4.59 4.59c.2.2.45.3.71.3s.51-.1.71-.29c.4-.4.4-1.05 0-1.45l-4.58-4.58zM6 13c-.83 0-1.5-.67-1.5-1.5S5.17 10 6 10s1.5.67 1.5 1.5S6.83 13 6 13zm10.5-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S18.83 13 18 13s-1.5-.67-1.5-1.5z" />
  </svg>
);

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const sidebar = (
    <ul className="nav flex-column pt-4 px-2">
      <li className="nav-item mb-3">
        <NavLink
          to="/gestion-compte"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center text-dark fw-bold rounded px-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#2C75FF" } : undefined
          }
          onClick={() => isMobile && toggleSidebar()}
        >
          <ManageAccounts className="me-2" />
          <span className="fw-bold">Gestion des comptes</span>
        </NavLink>
      </li>
      <li className="nav-item mb-3">
        <NavLink
          to="/livraison"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center text-dark fw-bold rounded px-2 ${
              isActive ? "text-white" : ""
            }`
          }
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#2C75FF" } : undefined
          }
          onClick={() => isMobile && toggleSidebar()}
        >
          <TwoWheeler className="me-2" />
          <span className="fw-bold">Livraison</span>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#1560BD" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {isMobile && (
              <IconButton onClick={toggleSidebar} color="inherit" className="me-2">
                {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
            <NavLink
              to="/"
              className="navbar-brand fw-bold d-flex align-items-center"
            >
              <MotoNavbarIcon />
              <span className="text-white">MotoApp</span>
            </NavLink>
          </div>

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
        {isMobile ? (
          <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
            <div style={{ width: 220 }}>{sidebar}</div>
          </Drawer>
        ) : (
          <div
            className="bg-light position-fixed"
            style={{ top: "55px", width: "220px", bottom: 0 }}
          >
            {sidebar}
          </div>
        )}

        {/* Content */}
        <main
          className="container-fluid"
          style={{
            marginLeft: isMobile ? 0 : "220px",
            paddingTop: "80px",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
