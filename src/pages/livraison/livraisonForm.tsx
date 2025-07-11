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
  const [filterStatus, setFilterStatus] = useState("ALL");

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

  // 🧱 Définition des colonnes du tableau
  const columns: GridColDef[] = [
    { field: "recipient_name", headerName: "Destinataire", flex: 1 },
    { field: "recipient_phone", headerName: "Téléphone", flex: 1 },
    { field: "pickup_address", headerName: "Adresse départ", flex: 1 },
    { field: "delivery_address", headerName: "Adresse livraison", flex: 1 },
    { field: "delivery_price", headerName: "Prix (Ar)", flex: 1 },
    { field: "status", headerName: "Statut", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleConfirmAdmin(params.row.id)}
          >
            Admin
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleConfirmDriver(params.row.id)}
          >
            Chauffeur
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          Toutes les livraisons
        </Typography>

        {/* 🔍 Filtrer par statut */}
        <FormControl fullWidth sx={{ mb: 2, maxWidth: 300 }}>
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

        {/* 📊 DataGrid */}
        <div style={{ height: 600, width: "100%" }}>
         <DataGrid
            rows={filteredDeliveries}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            paginationModel={{ pageSize: 10, page: 0 }} 
            pageSizeOptions={[10, 20, 50]}              
            disableRowSelectionOnClick                  
          />
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default AllDeliveriesPage;
