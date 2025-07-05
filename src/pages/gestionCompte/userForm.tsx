// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
// } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { registerUser, getAllUsers } from "../../core/actions/userActions";
// import { RegisterRequest, RoleType } from "../../core/models/userModels";
// import DashboardLayout from "../dasboard/DashboardLayout";
// import { SelectChangeEvent } from "@mui/material";
// import { clearUserError } from "../../core/slice/userSlice";
// import { toast } from "react-toastify";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const UserForm: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const users = useAppSelector((state) => state.user.users);
//   const loading = useAppSelector((state) => state.user.loading);

//   const [open, setOpen] = useState(false);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);

//   const [formUser, setFormUser] = useState<RegisterRequest>({
//     email: "",
//     password: "",
//     phone: "",
//     firstName: "",
//     lastName: "",
//     role: RoleType.USER,
//     profileImage: undefined,
//   });

//   const [viewUser, setViewUser] = useState<RegisterRequest | null>(null);

//   useEffect(() => {
//     if (users.length === 0) {
//       dispatch(getAllUsers());
//     }
//   }, [dispatch, users.length]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, files } = e.target as HTMLInputElement;
//     if (name === "profileImage" && files && files.length > 0) {
//       setFormUser((prev) => ({ ...prev, profileImage: files[0] }));
//     } else {
//       setFormUser((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setFormUser((prev) => ({
//       ...prev,
//       [name as string]: value as RoleType,
//     }));
//   };

//   const handleSubmit = () => {
//     dispatch(registerUser(formUser)).then((action) => {
//       if (registerUser.fulfilled.match(action)) {
//         toast.success("Utilisateur ajouté avec succès !");
//         handleClose();
//       } else {
//         toast.error("Erreur lors de l'ajout de l'utilisateur");
//       }
//     });
//   };

//   const handleClose = useCallback(() => {
//     setOpen(false);
//     dispatch(clearUserError());
//     setFormUser({
//       email: "",
//       password: "",
//       phone: "",
//       firstName: "",
//       lastName: "",
//       role: RoleType.USER,
//       profileImage: undefined,
//     });
//   }, [dispatch]);

//   useEffect(() => {
//     if (!open) {
//       dispatch(clearUserError());
//     }
//   }, [dispatch, open]);

//   const columns: GridColDef[] = [
//     { field: "firstName", headerName: "Prénom", flex: 1 },
//     { field: "lastName", headerName: "Nom", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "phone", headerName: "Téléphone", flex: 1 },
//     { field: "role", headerName: "Rôle", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton
//           color="primary"
//           onClick={() => {
//             setViewUser(params.row);
//             setViewDialogOpen(true);
//           }}
//         >
//           <VisibilityIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <DashboardLayout>
//       <Box p={3}>
//         <Typography variant="h4" gutterBottom>
//           Gestion des utilisateurs
//         </Typography>

//         <Box mt={2} mb={2}>
//           <Button variant="contained" onClick={() => setOpen(true)}>
//             Ajouter un utilisateur
//           </Button>
//         </Box>

//         <DataGrid
//           rows={users}
//           columns={columns}
//           getRowId={(row) => row.id}
//           autoHeight
//           sx={{ backgroundColor: "#fff", borderRadius: 2 }}
//         />

//         {/* Dialog - Ajout d'utilisateur */}
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           fullWidth
//           maxWidth="sm"
//           sx={{ zIndex: 1300 }}
//         >
//           <DialogTitle>Ajouter un utilisateur</DialogTitle>
//           <DialogContent dividers>
//             <TextField
//               fullWidth
//               name="firstName"
//               label="Prénom"
//               margin="normal"
//               value={formUser.firstName}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               name="lastName"
//               label="Nom"
//               margin="normal"
//               value={formUser.lastName}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               name="email"
//               label="Email"
//               type="email"
//               margin="normal"
//               value={formUser.email}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               name="password"
//               label="Mot de passe"
//               type="password"
//               margin="normal"
//               value={formUser.password}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               name="phone"
//               label="Téléphone"
//               margin="normal"
//               value={formUser.phone}
//               onChange={handleChange}
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Rôle</InputLabel>
//               <Select
//                 name="role"
//                 value={formUser.role}
//                 onChange={handleSelectChange}
//                 label="Rôle"
//               >
//                 {Object.values(RoleType).map((role) => (
//                   <MenuItem key={role} value={role}>
//                     {role}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <input
//               type="file"
//               name="profileImage"
//               accept="image/*"
//               onChange={handleChange}
//               style={{ marginTop: 16 }}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Annuler</Button>
//             <Button onClick={handleSubmit} variant="contained" disabled={loading}>
//               Enregistrer
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Dialog - Voir utilisateur */}
//         <Dialog
//           open={viewDialogOpen}
//           onClose={() => setViewDialogOpen(false)}
//           fullWidth
//           maxWidth="sm"
//         >
//           <DialogTitle>Informations du compte</DialogTitle>
//           <DialogContent dividers>
//             {viewUser && (
//               <>
//                 <Typography>Nom : {viewUser.lastName}</Typography>
//                 <Typography>Prénom : {viewUser.firstName}</Typography>
//                 <Typography>Email : {viewUser.email}</Typography>
//                 <Typography>Téléphone : {viewUser.phone}</Typography>
//                 <Typography>Rôle : {viewUser.role}</Typography>
//               </>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setViewDialogOpen(false)}>Fermer</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </DashboardLayout>
//   );
// };

// export default UserForm;


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
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser, getAllUsers } from "../../core/actions/userActions";
import { RegisterRequest, RoleType, User } from "../../core/models/userModels";
import DashboardLayout from "../dasboard/DashboardLayout";
import { SelectChangeEvent } from "@mui/material";
import { clearUserError } from "../../core/slice/userSlice";
import { toast } from "react-toastify";

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.user.loading);

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const [formUser, setFormUser] = useState<RegisterRequest>({
    id: "",
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    role: RoleType.CUSTOMER,
    profileImage: undefined,
  });

  // Charger tous les utilisateurs au montage
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
    if (isEditMode) {
      // Ici tu peux appeler une action updateUser quand elle sera prête
      toast.info("Modification non implémentée pour l'instant.");
      handleClose();
    } else {
      dispatch(registerUser(formUser)).then((action) => {
        if (registerUser.fulfilled.match(action)) {
          toast.success("Utilisateur ajouté avec succès !");
          handleClose();
        } else {
          toast.error("Erreur lors de l'ajout de l'utilisateur");
        }
      });
    }
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsEditMode(false);
    dispatch(clearUserError());
    setFormUser({
      id: "",
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
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              setViewUser(params.row);
              setViewDialogOpen(true);
            }}
            title="Voir"
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              setFormUser({
                id: params.row.id,
                email: params.row.email,
                password: "", 
                phone: params.row.phone,
                firstName: params.row.firstName,
                lastName: params.row.lastName,
                role: params.row.role,
                profileImage: undefined,
              });
              setIsEditMode(true);
              setOpen(true);
            }}
            title="Modifier"
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Gestion des utilisateurs
        </Typography>

        <Box mt={2} mb={2}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Ajouter un utilisateur
          </Button>
        </Box>

        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          sx={{ backgroundColor: "#fff", borderRadius: 2 }}
        />

        {/* Dialog Ajouter / Modifier */}
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          sx={{ zIndex: 1300 }}
        >
          <DialogTitle>{isEditMode ? "Modifier un utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              name="firstName"
              label="Prénom"
              margin="normal"
              value={formUser.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Nom"
              margin="normal"
              value={formUser.lastName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              margin="normal"
              value={formUser.email}
              onChange={handleChange}
              disabled={isEditMode} 
            />
            {!isEditMode && (
              <TextField
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                margin="normal"
                value={formUser.password}
                onChange={handleChange}
              />
            )}
            <TextField
              fullWidth
              name="phone"
              label="Téléphone"
              margin="normal"
              value={formUser.phone}
              onChange={handleChange}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Rôle</InputLabel>
              <Select
                name="role"
                value={formUser.role}
                onChange={handleSelectChange}
                label="Rôle"
              >
                {Object.values(RoleType).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              style={{ marginTop: 16 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={loading}>
              {isEditMode ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Voir utilisateur */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          fullWidth
          maxWidth="sm"
          sx={{ zIndex: 1300 }}
        >
          <DialogTitle>Détails de l'utilisateur</DialogTitle>
          <DialogContent dividers>
            {viewUser && (
              <>
                <Typography><strong>Prénom:</strong> {viewUser.firstName}</Typography>
                <Typography><strong>Nom:</strong> {viewUser.lastName}</Typography>
                <Typography><strong>Email:</strong> {viewUser.email}</Typography>
                <Typography><strong>Téléphone:</strong> {viewUser.phone}</Typography>
                <Typography><strong>Rôle:</strong> {viewUser.role}</Typography>
                {viewUser.profileImageUrl && (
                  <Box mt={2}>
                    <img
                      src={viewUser.profileImageUrl}
                      alt="Profil"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  </Box>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDialogOpen(false)}>Fermer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default UserForm;

