// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useAppSelector } from "./app/hooks";

// import LoginForm from "./pages/LoginForm";
// import RegisterForm from "./pages/RegisterForm";
// import Dashboard from "./pages/dasboard/Dashboard";
// import UserForm from "./pages/gestionCompte/userForm";
// import LivraisonPage from "./pages/livraison/livraisonForm";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
//   return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/gestion-compte"
//           element={
//             <ProtectedRoute>
//               <UserForm />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/livraison"
//           element={
//             <ProtectedRoute>
//               <LivraisonPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/dasboard/Dashboard";
import UserForm from "./pages/gestionCompte/userForm";
import LivraisonPage from "./pages/livraison/livraisonForm";
import FcmHandler from "./utils/fcm";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <FcmHandler />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-compte"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/livraison"
          element={
            <ProtectedRoute>
              <LivraisonPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
