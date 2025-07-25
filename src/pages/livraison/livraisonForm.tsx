// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Stack,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import {
//   fetchAllDeliveries,
//   adminConfirmDelivery,
//   driverConfirmDelivery,
// } from "../../core/actions/deliveryActions";
// import DashboardLayout from "../dasboard/DashboardLayout";
// import { showSnackbar } from "../../core/slice/snackbarSlice";

// const AllDeliveriesPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { deliveries, loading } = useAppSelector((state) => state.deliveries);
//   const [filterStatus, setFilterStatus] = useState("ALL");

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     dispatch(fetchAllDeliveries());
//   }, [dispatch]);

//   const handleConfirmAdmin = async (id: string) => {
//     try {
//       await dispatch(adminConfirmDelivery(id)).unwrap();
//       dispatch(fetchAllDeliveries());
//       dispatch(showSnackbar({ message: "Confirmé par Admin", type: "success" }));
//     } catch (err) {
//       dispatch(showSnackbar({ message: "Erreur confirmation Admin", type: "error" }));
//     }
//   };

//   const handleConfirmDriver = async (id: string) => {
//     try {
//       await dispatch(driverConfirmDelivery(id)).unwrap();
//       dispatch(fetchAllDeliveries());
//       dispatch(showSnackbar({ message: "Confirmé par Chauffeur", type: "success" }));
//     } catch (err) {
//       dispatch(showSnackbar({ message: "Erreur confirmation Chauffeur", type: "error" }));
//     }
//   };

//   const filteredDeliveries =
//     filterStatus === "ALL"
//       ? deliveries
//       : deliveries.filter((d: any) => d.status === filterStatus);

//   const columns: GridColDef[] = [
//     { field: "recipient_name", headerName: "Destinataire", flex: 1, minWidth: 120 },
//     { field: "recipient_phone", headerName: "Téléphone", flex: 1, minWidth: 120 },
//     { field: "pickup_address", headerName: "Adresse départ", flex: 1, minWidth: 150 },
//     { field: "delivery_address", headerName: "Adresse livraison", flex: 1, minWidth: 150 },
//     { field: "delivery_price", headerName: "Prix (Ar)", flex: 1, minWidth: 100 },
//     { field: "status", headerName: "Statut", flex: 1, minWidth: 100 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1.5,
//       sortable: false,
//       minWidth: 180,
//       renderCell: (params) => (
//         <Stack
//           direction={isSmallScreen ? "column" : "row"}
//           spacing={1}
//           sx={{ width: "100%" }}
//         >
//           <Button
//             size="small"
//             variant="contained"
//             color="primary"
//             fullWidth={isSmallScreen}
//             onClick={() => handleConfirmAdmin(params.row.id)}
//           >
//             Admin
//           </Button>
//           <Button
//             size="small"
//             variant="contained"
//             color="secondary"
//             fullWidth={isSmallScreen}
//             onClick={() => handleConfirmDriver(params.row.id)}
//           >
//             Chauffeur
//           </Button>
//         </Stack>
//       ),
//     },
//   ];

//   return (
//     <DashboardLayout>
//       <Box p={2}>
//         <Typography
//           variant="h4"
//           gutterBottom
//           align={isSmallScreen ? "center" : "left"}
//         >
//           Toutes les livraisons
//         </Typography>

//         <Box
//           display="flex"
//           flexDirection={isSmallScreen ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isSmallScreen ? "stretch" : "center"}
//           mb={2}
//         >
//           <FormControl fullWidth sx={{ maxWidth: 300 }}>
//             <InputLabel id="filter-label">Filtrer par statut</InputLabel>
//             <Select
//               labelId="filter-label"
//               value={filterStatus}
//               label="Filtrer par statut"
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <MenuItem value="ALL">Tous</MenuItem>
//               <MenuItem value="PENDING">En attente</MenuItem>
//               <MenuItem value="IN_PROGRESS">En cours</MenuItem>
//               <MenuItem value="DELIVERED">Livrée</MenuItem>
//               <MenuItem value="CANCELED">Annulée</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Box
//           sx={{
//             height: 600,
//             width: "100%",
//             overflowX: "auto",
//           }}
//         >
//           <DataGrid
//             rows={filteredDeliveries}
//             columns={columns}
//             loading={loading}
//             getRowId={(row) => row.id}
//             paginationModel={{ pageSize: 10, page: 0 }}
//             pageSizeOptions={[10, 20, 50]}
//             disableRowSelectionOnClick
//           />
//         </Box>
//       </Box>
//     </DashboardLayout>
//   );
// };

// export default AllDeliveriesPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAllDeliveries,
  adminConfirmDelivery,
  driverConfirmDelivery,
} from "../../core/actions/deliveryActions";
import DashboardLayout from "../dasboard/DashboardLayout";
import { showSnackbar } from "../../core/slice/snackbarSlice";

const AllDeliveriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { deliveries, loading } = useAppSelector((state) => state.deliveries);
  const { user } = useAppSelector((state) => state.auth); // 👈 récupération de l'utilisateur connecté
  const [filterStatus, setFilterStatus] = useState("ALL");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isAdmin = user?.role === "ADMIN"; // 👈 vérifie si l'utilisateur est admin

  useEffect(() => {
    dispatch(fetchAllDeliveries());
  }, [dispatch]);

  const handleConfirmAdmin = async (id: string) => {
    try {
      await dispatch(adminConfirmDelivery(id)).unwrap();
      dispatch(fetchAllDeliveries());
      dispatch(showSnackbar({ message: "Confirmé par Admin", type: "success" }));
    } catch (err) {
      dispatch(showSnackbar({ message: "Erreur confirmation Admin", type: "error" }));
    }
  };

  const handleConfirmDriver = async (id: string) => {
    try {
      await dispatch(driverConfirmDelivery(id)).unwrap();
      dispatch(fetchAllDeliveries());
      dispatch(showSnackbar({ message: "Confirmé par Chauffeur", type: "success" }));
    } catch (err) {
      dispatch(showSnackbar({ message: "Erreur confirmation Chauffeur", type: "error" }));
    }
  };

  const filteredDeliveries =
    filterStatus === "ALL"
      ? deliveries
      : deliveries.filter((d: any) => d.status === filterStatus);

  const columns: GridColDef[] = [
    { field: "recipient_name", headerName: "Destinataire", flex: 1, minWidth: 120 },
    { field: "recipient_phone", headerName: "Téléphone", flex: 1, minWidth: 120 },
    { field: "pickup_address", headerName: "Adresse départ", flex: 1, minWidth: 150 },
    { field: "delivery_address", headerName: "Adresse livraison", flex: 1, minWidth: 150 },
    { field: "delivery_price", headerName: "Prix (Ar)", flex: 1, minWidth: 100 },
    { field: "status", headerName: "Statut", flex: 1, minWidth: 100 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      minWidth: 180,
      renderCell: (params) =>
        isAdmin ? (
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            spacing={1}
            sx={{ width: "100%" }}
          >
            <Button
              size="small"
              variant="contained"
              color="primary"
              fullWidth={isSmallScreen}
              onClick={() => handleConfirmAdmin(params.row.id)}
            >
              Admin
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              fullWidth={isSmallScreen}
              onClick={() => handleConfirmDriver(params.row.id)}
            >
              Chauffeur
            </Button>
          </Stack>
        ) : (
          <Typography color="text.secondary">Non autorisé</Typography>
        ),
    },
  ];

  return (
    <DashboardLayout>
      <Box p={2}>
        <Typography
          variant="h4"
          gutterBottom
          align={isSmallScreen ? "center" : "left"}
        >
          Toutes les livraisons
        </Typography>

        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isSmallScreen ? "stretch" : "center"}
          mb={2}
        >
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
            <InputLabel id="filter-label">Filtrer par statut</InputLabel>
            <Select
              labelId="filter-label"
              value={filterStatus}
              label="Filtrer par statut"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="ALL">Tous</MenuItem>
              <MenuItem value="PENDING">En attente</MenuItem>
              <MenuItem value="IN_PROGRESS">En cours</MenuItem>
              <MenuItem value="DELIVERED">Livrée</MenuItem>
              <MenuItem value="CANCELED">Annulée</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            height: 600,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={filteredDeliveries}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            paginationModel={{ pageSize: 10, page: 0 }}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default AllDeliveriesPage;
