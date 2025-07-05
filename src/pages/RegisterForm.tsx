import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register } from "../core/actions/authActions";
import { RegisterRequest, RoleType } from "../core/models/authModels";
import { useNavigate, Link } from "react-router-dom";

const roles: RoleType[] = [RoleType.CUSTOMER, RoleType.DRIVER, RoleType.ADMIN];

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);

  const [form, setForm] = useState<RegisterRequest>({
    email: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
    role: RoleType.CUSTOMER,
    profileImage: undefined,
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange =
    (field: keyof RegisterRequest) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: event.target.value });
    };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setForm({ ...form, role: event.target.value as RoleType });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setForm({ ...form, profileImage: event.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await dispatch(register(form));
      if (register.fulfilled.match(result)) {
        navigate("/dashboard");
      } else if (register.rejected.match(result)) {
        setError(result.payload || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setError("Erreur inattendue");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Inscription
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Prénom"
              value={form.firstName}
              onChange={handleInputChange("firstName")}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Nom"
              value={form.lastName}
              onChange={handleInputChange("lastName")}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Téléphone"
              value={form.phone}
              onChange={handleInputChange("phone")}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={handleInputChange("email")}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="role-label">Rôle</InputLabel>
            <Select
              labelId="role-label"
              value={form.role}
              label="Rôle"
              onChange={handleSelectChange}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="profileImage">Photo de profil</InputLabel>
            <Input
              id="profileImage"
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleInputChange("password")}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={authState.loading}
          >
            S'inscrire
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Déjà un compte ?{" "}
            <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
              Se connecter
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;