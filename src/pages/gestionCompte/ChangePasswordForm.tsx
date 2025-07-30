import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changePassword } from "../../core/actions/userActions";
import { resetPasswordState } from "../../core/slice/userSlice";
import { toast } from "react-toastify";

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
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
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
    if (success) {
      toast.success("Mot de passe modifié avec succès");
      onClose(); 
      dispatch(resetPasswordState());
    } else if (error) {
      toast.error(`Erreur : ${error}`);
      dispatch(resetPasswordState());
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
      <Typography variant="h6" align="center" gutterBottom>
        Changer le mot de passe
      </Typography>

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
                <IconButton onClick={toggleShow("showCurrentPassword")} edge="end">
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
                <IconButton onClick={toggleShow("showNewPassword")} edge="end">
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
                <IconButton onClick={toggleShow("showConfirmPassword")} edge="end">
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
