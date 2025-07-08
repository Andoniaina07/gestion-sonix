import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser, getAllUsers } from "../../core/actions/userActions";
import { RegisterRequest, RoleType, User } from "../../core/models/userModels";
import DashboardLayout from "../dasboard/DashboardLayout";
import { SelectChangeEvent } from "@mui/material";
import { clearUserError } from "../../core/slice/userSlice";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChangePasswordForm from "../../pages/gestionCompte/ChangePasswordForm";

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.user.loading);

  const [open, setOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [formUser, setFormUser] = useState<RegisterRequest>({
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    role: RoleType.CUSTOMER,
    profileImage: undefined,
  });

  const [viewUser, setViewUser] = useState<RegisterRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "profileImage" && files && files.length > 0) {
      setFormUser((prev) => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({
      ...prev,
      [name as string]: value as RoleType,
    }));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, password } = formUser;
    if (!firstName || !lastName || !email || !password) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    dispatch(registerUser(formUser)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        toast.success("Utilisateur ajouté avec succès !");
        handleClose();
      } else {
        toast.error("Erreur lors de l'ajout de l'utilisateur");
      }
    });
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    dispatch(clearUserError());
    setFormUser({
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
      role: RoleType.CUSTOMER,
      profileImage: undefined,
    });
  }, [dispatch]);

  useEffect(() => {
    if (!open) {
      dispatch(clearUserError());
    }
  }, [dispatch, open]);

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "Prénom", flex: 1 },
    { field: "lastName", headerName: "Nom", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Téléphone", flex: 1 },
    { field: "role", headerName: "Rôle", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            setViewUser(params.row);
            setViewDialogOpen(true);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  // ✅ Filtrage par recherche
  const filteredUsers = users.filter((user: User) => {
    const fullText = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
    return fullText.includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des utilisateurs
        </Typography>

        <Box mt={2} mb={2} display="flex" gap={2}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Ajouter un utilisateur
          </Button>
          <Button variant="outlined" onClick={() => setChangePasswordOpen(true)}>
            Changer mon mot de passe
          </Button>
          <TextField
            label="Rechercher..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ ml: "auto" }}
          />
        </Box>

        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row.id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
          pagination
          disableRowSelectionOnClick
          sx={{ backgroundColor: "#fff", borderRadius: 2 }}
        />

        {/* Dialog - Ajout d'utilisateur */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogContent dividers>
            <TextField fullWidth name="firstName" label="Prénom" margin="normal" value={formUser.firstName} onChange={handleChange} />
            <TextField fullWidth name="lastName" label="Nom" margin="normal" value={formUser.lastName} onChange={handleChange} />
            <TextField fullWidth name="email" label="Email" type="email" margin="normal" value={formUser.email} onChange={handleChange} />
            <TextField fullWidth name="password" label="Mot de passe" type="password" margin="normal" value={formUser.password} onChange={handleChange} />
            <TextField fullWidth name="phone" label="Téléphone" margin="normal" value={formUser.phone} onChange={handleChange} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rôle</InputLabel>
              <Select name="role" value={formUser.role} onChange={handleSelectChange} label="Rôle">
                {Object.values(RoleType).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input type="file" name="profileImage" accept="image/*" onChange={handleChange} style={{ marginTop: 16 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}>
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog - Voir utilisateur */}
        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Informations du compte</DialogTitle>
          <DialogContent dividers>
            {viewUser && (
              <>
                <Typography>Nom : {viewUser.lastName}</Typography>
                <Typography>Prénom : {viewUser.firstName}</Typography>
                <Typography>Email : {viewUser.email}</Typography>
                <Typography>Téléphone : {viewUser.phone}</Typography>
                <Typography>Rôle : {viewUser.role}</Typography>
                {viewUser.profileImage && typeof viewUser.profileImage === "string" && (
                  <img
                    src={viewUser.profileImage}
                    alt={`${viewUser.firstName} ${viewUser.lastName}`}
                    width="100"
                    height="100"
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Fermer</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog - Changer mot de passe */}
        <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Changer mon mot de passe</DialogTitle>
          <DialogContent dividers>
            <ChangePasswordForm onClose={() => setChangePasswordOpen(false)} />
          </DialogContent>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default UserForm;
