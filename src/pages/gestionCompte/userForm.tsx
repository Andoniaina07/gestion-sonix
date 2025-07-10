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
import {
  registerUser,
  getAllUsers,
  saveUser,
  fetchUser,
} from "../../core/actions/userActions";
import {
  RegisterRequest,
  RoleType,
  User,
  UpdateUserDto,
} from "../../core/models/userModels";
import DashboardLayout from "../dasboard/DashboardLayout";
import { SelectChangeEvent } from "@mui/material";
import { clearUserState } from "../../core/slice/userSlice";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChangePasswordForm from "./ChangePasswordForm";
import { AnyAction } from "@reduxjs/toolkit";
import { IMAGE_SERVER } from "../../config/config";

const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const loading = useAppSelector((state) => state.user.loading);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
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

  const [imagePreview, setImagePreview] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

  // Chargement initial des utilisateurs
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (editMode && editingUserId) {
      dispatch(fetchUser(editingUserId));
    }
  }, [dispatch, editMode, editingUserId]);

  useEffect(() => {
    if (editMode && currentUser) {
      setFormUser({
        email: currentUser.email,
        phone: currentUser.phone,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: currentUser.role,
        password: "",
        profileImage: undefined,
      });

      if (currentUser.profileImageUrl) {
        setImagePreview(`${IMAGE_SERVER}/api/users/profile/${currentUser.profileImageUrl}`);
      }
    }
  }, [currentUser, editMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files && files[0]) {
      setFormUser((prev) => ({ ...prev, profileImage: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value as RoleType }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, password, phone, profileImage } = formUser;

    if (!firstName || !lastName || !email) {
      toast.error("Champs obligatoires manquants.");
      return;
    }

    if (editMode && editingUserId) {
      let base64Image: string | undefined = undefined;
      if (profileImage instanceof File) {
        try {
          base64Image = await convertFileToBase64(profileImage);
        } catch {
          toast.error("Erreur conversion image");
          return;
        }
      }

      const updateData: UpdateUserDto = {
        email,
        phone,
        firstName,
        lastName,
        profileImage: base64Image,
      };

      dispatch(saveUser(updateData)).then((action: AnyAction) => {
        if (saveUser.fulfilled.match(action)) {
          toast.success("Utilisateur modifié !");
          handleClose();
          dispatch(getAllUsers());
        } else {
          toast.error("Erreur de modification.");
        }
      });

    } else {
      if (!password) {
        toast.error("Mot de passe requis.");
        return;
      }

      dispatch(registerUser(formUser)).then((action: AnyAction) => {
        if (registerUser.fulfilled.match(action)) {
          toast.success("Utilisateur ajouté !");
          handleClose();
          dispatch(getAllUsers());
        } else {
          toast.error("Erreur lors de l'ajout.");
        }
      });
    }
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setEditMode(false);
    setEditingUserId(null);
    dispatch(clearUserState());
    setFormUser({
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
      role: RoleType.CUSTOMER,
      profileImage: undefined,
    });
    setImagePreview("");
  }, [dispatch]);

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
        <>
          <IconButton
            color="primary"
            onClick={() => {
              setViewDialogOpen(true);
              setFormUser(params.row);
              if (params.row.profileImage) {
                setImagePreview(`${IMAGE_SERVER}/api/users/profile/${params.row.profileImage}`);
              }
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <Button
            size="small"
            onClick={() => {
              setEditMode(true);
              setEditingUserId(params.row.id);
              setOpen(true);
            }}
          >
            Modifier
          </Button>
        </>
      ),
    },
  ];

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
          disableRowSelectionOnClick
          sx={{ backgroundColor: "#fff", borderRadius: 2 }}
        />

        {/* ➕ MODAL AJOUT / MODIFICATION */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{editMode ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
          <DialogContent dividers>
            {imagePreview && (
              <Box my={2}>
                <img src={imagePreview} alt="preview" width="100" height="100" style={{ borderRadius: "50%" }} />
              </Box>
            )}
            <TextField fullWidth name="firstName" label="Prénom" value={formUser.firstName} onChange={handleChange} margin="normal" />
            <TextField fullWidth name="lastName" label="Nom" value={formUser.lastName} onChange={handleChange} margin="normal" />
            <TextField fullWidth name="email" label="Email" value={formUser.email} onChange={handleChange} margin="normal" />
            {!editMode && (
              <TextField fullWidth name="password" label="Mot de passe" type="password" value={formUser.password} onChange={handleChange} margin="normal" />
            )}
            <TextField fullWidth name="phone" label="Téléphone" value={formUser.phone} onChange={handleChange} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rôle</InputLabel>
              <Select name="role" value={formUser.role} onChange={handleSelectChange}>
                {Object.values(RoleType).map((role) => (
                  <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button component="label" variant="outlined" sx={{ mt: 2 }}>
              Choisir une image
              <input type="file" hidden name="profileImage" accept="image/*" onChange={handleChange} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSubmit} disabled={loading} variant="contained" startIcon={loading ? <CircularProgress size={20} /> : null}>
              {editMode ? "Mettre à jour" : "Enregistrer"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 👁️ MODAL AFFICHAGE */}
        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Profil Utilisateur</DialogTitle>
          <DialogContent dividers>
            <Typography>Nom : {formUser.lastName}</Typography>
            <Typography>Prénom : {formUser.firstName}</Typography>
            <Typography>Email : {formUser.email}</Typography>
            <Typography>Téléphone : {formUser.phone}</Typography>
            <Typography>Rôle : {formUser.role}</Typography>
            {imagePreview && (
              <img src={imagePreview} alt="avatar" width="100" height="100" style={{ borderRadius: "50%" }} />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Fermer</Button>
          </DialogActions>
        </Dialog>

        {/* 🔒 MODAL CHANGEMENT DE MOT DE PASSE */}
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
