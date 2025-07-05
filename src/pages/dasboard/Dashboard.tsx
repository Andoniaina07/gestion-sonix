import React from "react";
// import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { Button, Typography, Box } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
// import { logout } from "../../core/slice/authSlice";
// import UserForm from "../gestionCompte/userForm"; 

const Dashboard = () => {
//   const user = useAppSelector((state) => state.auth.user);
//   const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

  // if (!user) return null;

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        {/* <Typography variant="h4" gutterBottom>
          Bienvenue, {user.firstName || user.email} !
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Déconnexion
        </Button> */}
      </Box>
      {/* <UserForm /> */}
    </DashboardLayout>
  );
};

export default Dashboard;
