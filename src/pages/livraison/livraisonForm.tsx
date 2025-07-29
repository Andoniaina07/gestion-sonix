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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import {
//   fetchAllDeliveries,
//   adminConfirmDelivery,
//   driverConfirmDelivery,
//   changeDeliveryPrice,
// } from "../../core/actions/deliveryActions";
// import { getAllUsers } from "../../core/actions/userActions";
// import DashboardLayout from "../dasboard/DashboardLayout";
// import { showSnackbar } from "../../core/slice/snackbarSlice";

// interface Delivery {
//   id: string;
//   recipient_name: string;
//   recipient_phone: string;
//   pickup_address: string;
//   delivery_address: string;
//   delivery_price: number | string;
//   status: string;
// }
// const AllDeliveriesPage: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const deliveries = useAppSelector((state) => state.deliveries.deliveries);
//   const loading = useAppSelector((state) => state.deliveries.loading);
//   const user = useAppSelector((state) => state.auth.user);
//   const users = useAppSelector((state) => state.user.users);

//   const [filterStatus, setFilterStatus] = useState("ALL");
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [selectedDriver, setSelectedDriver] = useState<string>("");
//   const [confirmTarget, setConfirmTarget] = useState<{ id: string; type: "ADMIN" | "DRIVER" } | null>(null);
//   const [infoDialogOpen, setInfoDialogOpen] = useState(false);
//   const [editForm, setEditForm] = useState<Partial<Delivery>>({});
//   const [priceError, setPriceError] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const isAdmin = user?.role === "ADMIN";
//   const isDriver = user?.role === "DRIVER";

//   useEffect(() => {
//     dispatch(fetchAllDeliveries());
//   }, [dispatch]);

//   useEffect(() => {
//     if (confirmDialogOpen && confirmTarget?.type === "ADMIN") {
//       dispatch(getAllUsers());
//     }
//   }, [confirmDialogOpen, confirmTarget, dispatch]);

//   const handleConfirm = async () => {
//     if (!confirmTarget) return;
//     try {
//       if (confirmTarget.type === "ADMIN") {
//         await dispatch(adminConfirmDelivery({ id: confirmTarget.id, driverId: selectedDriver })).unwrap();
//         dispatch(showSnackbar({ message: "Confirmé par Admin", type: "success" }));
//       } else {
//         await dispatch(driverConfirmDelivery(confirmTarget.id)).unwrap();
//         dispatch(showSnackbar({ message: "Confirmé par Chauffeur", type: "success" }));
//       }
//       dispatch(fetchAllDeliveries());
//     } catch {
//       dispatch(showSnackbar({ message: "Erreur de confirmation", type: "error" }));
//     } finally {
//       setConfirmDialogOpen(false);
//       setSelectedDriver("");
//       setConfirmTarget(null);
//     }
//   };

//   const handleOpenEditDialog = (delivery: Delivery) => {
//     setEditForm({ ...delivery });
//     setPriceError(null);
//     setInfoDialogOpen(true);
//   };

//   const handleEditChange = (field: keyof Delivery, value: any) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//     if (field === "delivery_price") {
//       setPriceError(null);
//     }
//   };

//   const handleSaveEdit = async () => {
//     const price = parseFloat(String(editForm.delivery_price));
//     if (isNaN(price) || price < 0) {
//       setPriceError("Veuillez saisir un prix valide et positif");
//       return;
//     }
//     setPriceError(null);
//     setSaving(true);
//     try {
//       await dispatch(changeDeliveryPrice({ id: editForm.id!, data: { delivery_price: price } })).unwrap();
//       dispatch(fetchAllDeliveries());
//       dispatch(showSnackbar({ message: "Prix mis à jour", type: "success" }));
//       setInfoDialogOpen(false);
//     } catch {
//       dispatch(showSnackbar({ message: "Erreur lors de la mise à jour", type: "error" }));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const filteredDeliveries =
//     filterStatus === "ALL"
//       ? deliveries
//       : deliveries.filter((d: Delivery) => d.status === filterStatus);

//   const columns: GridColDef<Delivery>[] = [
//     { field: "recipient_name", headerName: "Destinataire", flex: 1, minWidth: 120 },
//     { field: "recipient_phone", headerName: "Téléphone", flex: 1, minWidth: 120 },
//     { field: "pickup_address", headerName: "Adresse départ", flex: 1, minWidth: 150 },
//     { field: "delivery_address", headerName: "Adresse livraison", flex: 1, minWidth: 150 },
//     { field: "delivery_price", headerName: "Prix (Ar)", flex: 1, minWidth: 100 },
//     { field: "status", headerName: "Statut", flex: 1, minWidth: 100 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 2,
//       minWidth: 300,
//       sortable: false,
//       renderCell: (params) => {
//         const { id, status } = params.row;
//         const isPending = status === "PENDING";
//         const isInProgress = status === "IN_PROGRESS";

//         return (
//           <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
//             {isAdmin && (
//               <Button
//                 size="small"
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   setConfirmTarget({ id, type: "ADMIN" });
//                   setConfirmDialogOpen(true);
//                 }}
//                 disabled={!isPending}
//               >
//                 Admin
//               </Button>
//             )}
//             {isDriver && (
//               <Button
//                 size="small"
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => {
//                   setConfirmTarget({ id, type: "DRIVER" });
//                   setConfirmDialogOpen(true);
//                 }}
//                 disabled={!isInProgress}
//               >
//                 Chauffeur
//               </Button>
//             )}
//             <Tooltip title="Modifier">
//               <IconButton onClick={() => handleOpenEditDialog(params.row)} color="info">
//                 <VisibilityIcon />
//               </IconButton>
//             </Tooltip>
//           </Stack>
//         );
//       },
//     },
//   ];

//   return (
//     <DashboardLayout>
//       <Box p={2}>
//         <Typography variant="h4" gutterBottom align={isSmallScreen ? "center" : "left"}>
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

//         <Box sx={{ height: 600, width: "100%", overflowX: "auto" }}>
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

//         {!loading && filteredDeliveries.length === 0 && (
//           <Typography variant="body2" color="text.secondary" mt={2}>
//             Aucune livraison à afficher.
//           </Typography>
//         )}
//       </Box>

//       <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           {confirmTarget?.type === "ADMIN" && (
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Choisir un chauffeur</InputLabel>
//               <Select
//                 value={selectedDriver}
//                 onChange={(e) => setSelectedDriver(e.target.value)}
//                 label="Choisir un chauffeur"
//               >
//                 {users
//                   .filter((u) => u.role === "DRIVER")
//                   .map((driver) => (
//                     <MenuItem key={driver.id} value={driver.id}>
//                       {driver.firstName} {driver.lastName}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           )}
//           <Typography mt={2}>Voulez-vous vraiment confirmer cette livraison ?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDialogOpen(false)}>Annuler</Button>
//           <Button
//             onClick={handleConfirm}
//             variant="contained"
//             color="primary"
//             disabled={confirmTarget?.type === "ADMIN" && !selectedDriver}
//           >
//             Confirmer
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Modifier la livraison</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} mt={1}>
//             <TextField
//               label="Nom du destinataire"
//               value={editForm.recipient_name || ""}
//               onChange={(e) => handleEditChange("recipient_name", e.target.value)}
//               fullWidth
//             />
//             <TextField
//               label="Téléphone"
//               value={editForm.recipient_phone || ""}
//               onChange={(e) => handleEditChange("recipient_phone", e.target.value)}
//               fullWidth
//             />
//             <TextField
//               label="Adresse de départ"
//               value={editForm.pickup_address || ""}
//               onChange={(e) => handleEditChange("pickup_address", e.target.value)}
//               fullWidth
//             />
//             <TextField
//               label="Adresse de livraison"
//               value={editForm.delivery_address || ""}
//               onChange={(e) => handleEditChange("delivery_address", e.target.value)}
//               fullWidth
//             />
//             <TextField
//               label="Prix"
//               type="number"
//               value={editForm.delivery_price || ""}
//               onChange={(e) => handleEditChange("delivery_price", e.target.value)}
//               fullWidth
//               error={!!priceError}
//               helperText={priceError || ""}
//               disabled={saving}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setInfoDialogOpen(false)} disabled={saving}>
//             Annuler
//           </Button>
//           <Button onClick={handleSaveEdit} variant="contained" color="primary" disabled={saving}>
//             {saving ? <CircularProgress size={24} color="inherit" /> : "Enregistrer"}
//           </Button>
//         </DialogActions>
//       </Dialog>
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchAllDeliveries,
  adminConfirmDelivery,
  driverConfirmDelivery,
  changeDeliveryPrice,
} from "../../core/actions/deliveryActions";
import { getAllUsers } from "../../core/actions/userActions";
import DashboardLayout from "../dasboard/DashboardLayout";
import { showSnackbar } from "../../core/slice/snackbarSlice";
import {
  Delivery,
  DeliveryStatus,
  DeliveryStatusLabels,
} from "../../core/models/deliveryModels";

const AllDeliveriesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const deliveries = useAppSelector((state) => state.deliveries.deliveries);
  const loading = useAppSelector((state) => state.deliveries.loading);
  const user = useAppSelector((state) => state.auth.user);
  const users = useAppSelector((state) => state.user.users);

  const [filterStatus, setFilterStatus] = useState<DeliveryStatus | "ALL">("ALL");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [confirmTarget, setConfirmTarget] = useState<{ id: string; type: "ADMIN" | "DRIVER" } | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Delivery>>({});
  const [priceError, setPriceError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isAdmin = user?.role === "ADMIN";
  const isDriver = user?.role === "DRIVER";

  useEffect(() => {
    dispatch(fetchAllDeliveries());
  }, [dispatch]);

  useEffect(() => {
    if (confirmDialogOpen && confirmTarget?.type === "ADMIN") {
      dispatch(getAllUsers());
    }
  }, [confirmDialogOpen, confirmTarget, dispatch]);

  const handleConfirm = async () => {
    if (!confirmTarget) return;
    try {
      if (confirmTarget.type === "ADMIN") {
        await dispatch(adminConfirmDelivery({ id: confirmTarget.id, driverId: selectedDriver })).unwrap();
        dispatch(showSnackbar({ message: "Confirmé par Admin", type: "success" }));
      } else {
        await dispatch(driverConfirmDelivery(confirmTarget.id)).unwrap();
        dispatch(showSnackbar({ message: "Confirmé par Chauffeur", type: "success" }));
      }
      dispatch(fetchAllDeliveries());
    } catch {
      dispatch(showSnackbar({ message: "Erreur de confirmation", type: "error" }));
    } finally {
      setConfirmDialogOpen(false);
      setSelectedDriver("");
      setConfirmTarget(null);
    }
  };

  const handleOpenEditDialog = (delivery: Delivery) => {
    setEditForm({ ...delivery });
    setPriceError(null);
    setInfoDialogOpen(true);
  };

  const handleEditChange = (field: keyof Delivery, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
    if (field === "delivery_price") {
      setPriceError(null);
    }
  };

  const handleSaveEdit = async () => {
    const price = parseFloat(String(editForm.delivery_price));
    if (isNaN(price) || price < 0) {
      setPriceError("Veuillez saisir un prix valide et positif");
      return;
    }
    setPriceError(null);
    setSaving(true);
    try {
      await dispatch(changeDeliveryPrice({ id: editForm.id!, data: { delivery_price: price } })).unwrap();
      dispatch(fetchAllDeliveries());
      dispatch(showSnackbar({ message: "Prix mis à jour", type: "success" }));
      setInfoDialogOpen(false);
    } catch {
      dispatch(showSnackbar({ message: "Erreur lors de la mise à jour", type: "error" }));
    } finally {
      setSaving(false);
    }
  };

  const filteredDeliveries =
    filterStatus === "ALL"
      ? deliveries
      : deliveries.filter((d: Delivery) => d.status === filterStatus);

  const columns: GridColDef<Delivery>[] = [
    { field: "recipient_name", headerName: "Destinataire", flex: 1, minWidth: 120 },
    { field: "recipient_phone", headerName: "Téléphone", flex: 1, minWidth: 120 },
    { field: "pickup_address", headerName: "Adresse départ", flex: 1, minWidth: 150 },
    { field: "delivery_address", headerName: "Adresse livraison", flex: 1, minWidth: 150 },
    { field: "delivery_price", headerName: "Prix (Ar)", flex: 1, minWidth: 100 },
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const value = params.value as DeliveryStatus;
        return DeliveryStatusLabels[value] || value;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      minWidth: 300,
      sortable: false,
      renderCell: (params) => {
        const { id, status } = params.row;
        const isPending = status === DeliveryStatus.PENDING;
        const isConfirmedAdmin = status === DeliveryStatus.CONFIRMED_ADMIN;

        return (
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
            {isAdmin && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  setConfirmTarget({ id, type: "ADMIN" });
                  setConfirmDialogOpen(true);
                }}
                disabled={!isPending}
              >
                Admin
              </Button>
            )}
            {isDriver && (
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setConfirmTarget({ id, type: "DRIVER" });
                  setConfirmDialogOpen(true);
                }}
                disabled={!isConfirmedAdmin}
              >
                Chauffeur
              </Button>
            )}
            <Tooltip title="Modifier">
              <IconButton onClick={() => handleOpenEditDialog(params.row)} color="info">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <Box p={2} sx={{ minHeight: 600 }}>
        <Typography variant="h4" gutterBottom align={isSmallScreen ? "center" : "left"}>
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
              onChange={(e) => setFilterStatus(e.target.value as DeliveryStatus | "ALL")}
            >
              <MenuItem value="ALL">Tous</MenuItem>
              {Object.entries(DeliveryStatusLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 600,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ height: 600, width: "100%", overflowX: "auto" }}>
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

            {!loading && filteredDeliveries.length === 0 && (
              <Typography variant="body2" color="text.secondary" mt={2}>
                Aucune livraison à afficher.
              </Typography>
            )}
          </>
        )}
      </Box>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          {confirmTarget?.type === "ADMIN" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Choisir un chauffeur</InputLabel>
              <Select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                label="Choisir un chauffeur"
              >
                {users
                  .filter((u) => u.role === "DRIVER")
                  .map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.firstName} {driver.lastName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          <Typography mt={2}>Voulez-vous vraiment confirmer cette livraison ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Annuler</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            disabled={confirmTarget?.type === "ADMIN" && !selectedDriver}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier la livraison</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nom du destinataire"
              value={editForm.recipient_name || ""}
              onChange={(e) => handleEditChange("recipient_name", e.target.value)}
              fullWidth
            />
            <TextField
              label="Téléphone"
              value={editForm.recipient_phone || ""}
              onChange={(e) => handleEditChange("recipient_phone", e.target.value)}
              fullWidth
            />
            <TextField
              label="Adresse de départ"
              value={editForm.pickup_address || ""}
              onChange={(e) => handleEditChange("pickup_address", e.target.value)}
              fullWidth
            />
            <TextField
              label="Adresse de livraison"
              value={editForm.delivery_address || ""}
              onChange={(e) => handleEditChange("delivery_address", e.target.value)}
              fullWidth
            />
            <TextField
              label="Prix"
              type="number"
              value={editForm.delivery_price || ""}
              onChange={(e) => handleEditChange("delivery_price", e.target.value)}
              fullWidth
              error={!!priceError}
              helperText={priceError || ""}
              disabled={saving}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)} disabled={saving}>
            Annuler
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary" disabled={saving}>
            {saving ? <CircularProgress size={24} color="inherit" /> : "Enregistrer"}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default AllDeliveriesPage;
