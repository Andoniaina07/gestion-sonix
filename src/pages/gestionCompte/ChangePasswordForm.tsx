// import { changePassword } from "../../core/actions/userActions";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { resetPasswordState } from "../../core/slice/userSlice";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   Input,
//   InputAdornment,
//   InputLabel,
//   Typography,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const ChangePasswordForm = () => {
//   const dispatch = useAppDispatch();
//   const { loading, success, error } = useAppSelector((state) => state.user);

//   const [values, setValues] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     showCurrentPassword: false,
//     showNewPassword: false,
//     showConfirmPassword: false,
//   });

//   const handleChange =
//     (prop: keyof typeof values) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setValues({ ...values, [prop]: event.target.value });
//     };

//   const toggleShow = (prop: keyof typeof values) => () => {
//     setValues((prev) => ({ ...prev, [prop]: !prev[prop] }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (values.newPassword !== values.confirmPassword) {
//       alert("Les nouveaux mots de passe ne correspondent pas.");
//       return;
//     }

//     dispatch(
//       changePassword({
//         currentPassword: values.currentPassword,
//         newPassword: values.newPassword,
//       })
//     );
//   };

//   useEffect(() => {
//     if (success || error) {
//       const timeout = setTimeout(() => {
//         dispatch(resetPasswordState());
//       }, 3000);
//       return () => clearTimeout(timeout);
//     }
//   }, [success, error, dispatch]);

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         mx: "auto",
//         mt: 4,
//         p: 3,
//         backgroundColor: "#fff",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h6" gutterBottom align="center">
//         Changer le mot de passe
//       </Typography>

//       {success && <Alert severity="success">Mot de passe mis à jour avec succès</Alert>}
//       {error && <Alert severity="error">{error}</Alert>}

//       <form onSubmit={handleSubmit}>
//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="current-password">Mot de passe actuel</InputLabel>
//           <Input
//             id="current-password"
//             type={values.showCurrentPassword ? "text" : "password"}
//             value={values.currentPassword}
//             onChange={handleChange("currentPassword")}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton onClick={toggleShow("showCurrentPassword")}>
//                   {values.showCurrentPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="new-password">Nouveau mot de passe</InputLabel>
//           <Input
//             id="new-password"
//             type={values.showNewPassword ? "text" : "password"}
//             value={values.newPassword}
//             onChange={handleChange("newPassword")}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton onClick={toggleShow("showNewPassword")}>
//                   {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel htmlFor="confirm-password">Confirmer mot de passe</InputLabel>
//           <Input
//             id="confirm-password"
//             type={values.showConfirmPassword ? "text" : "password"}
//             value={values.confirmPassword}
//             onChange={handleChange("confirmPassword")}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton onClick={toggleShow("showConfirmPassword")}>
//                   {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </FormControl>

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           disabled={loading}
//           sx={{ mt: 2 }}
//         >
//           {loading ? "Modification en cours..." : "Changer le mot de passe"}
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ChangePasswordForm;

import { changePassword } from "../../core/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetPasswordState } from "../../core/slice/userSlice";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// ✅ Ajoute les props
interface ChangePasswordFormProps {
  onClose: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.user);

  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const handleChange =
    (prop: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const toggleShow = (prop: keyof typeof values) => () => {
    setValues((prev) => ({ ...prev, [prop]: !prev[prop] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (values.newPassword !== values.confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    dispatch(
      changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
    );
  };

  useEffect(() => {
    if (success || error) {
      const timeout = setTimeout(() => {
        dispatch(resetPasswordState());

        // ✅ Fermer la modale si succès
        if (success) {
          onClose();
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, error, dispatch, onClose]);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Changer le mot de passe
      </Typography>

      {success && <Alert severity="success">Mot de passe mis à jour avec succès</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="current-password">Mot de passe actuel</InputLabel>
          <Input
            id="current-password"
            type={values.showCurrentPassword ? "text" : "password"}
            value={values.currentPassword}
            onChange={handleChange("currentPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShow("showCurrentPassword")}>
                  {values.showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="new-password">Nouveau mot de passe</InputLabel>
          <Input
            id="new-password"
            type={values.showNewPassword ? "text" : "password"}
            value={values.newPassword}
            onChange={handleChange("newPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShow("showNewPassword")}>
                  {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="confirm-password">Confirmer mot de passe</InputLabel>
          <Input
            id="confirm-password"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShow("showConfirmPassword")}>
                  {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Modification en cours..." : "Changer le mot de passe"}
        </Button>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
