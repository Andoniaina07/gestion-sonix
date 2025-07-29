import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, TwoWheeler } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { login } from "../core/actions/authActions";
import { LoginRequest } from "../core/models/authModels";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginRequest>({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange =
    (prop: keyof LoginRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.target.value });
    };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    if (!isValidEmail(values.emailOrPhone)) {
      setValidationError("Veuillez saisir un email valide.");
      return;
    }

    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      navigate("/gestion-compte");
    } else if (login.rejected.match(result)) {
      setError(result.payload || "Erreur de connexion");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/background.jpg')", // ← ajoute ton image ici (dans public/)
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: 2,
          boxShadow: 6,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center" mb={1}>
            <TwoWheeler sx={{ fontSize: 40, color: "#1976d2" }} />
          </Box>

          <Typography variant="h5" align="center" gutterBottom>
            Connexion
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {validationError && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {validationError}
            </Alert>
          )}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Email"
              type="email"
              value={values.emailOrPhone}
              onChange={handleChange("emailOrPhone")}
              required
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              required
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Se connecter
          </Button>

          {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              S'inscrire
            </Link>
          </Typography> */}
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
