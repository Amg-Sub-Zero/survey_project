import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth, canAccess } from "./context/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import Profile from "./pages/Profile";

// Redirects to login if not authenticated
function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Checks role permission for a specific page key
function RequireRole({ page, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!canAccess(user.role, page)) return <Navigate to="/unauthorized" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Layout>
              <Routes>
                <Route path="/" element={<RequireRole page="dashboard"><Dashboard /></RequireRole>} />
                <Route path="/pos" element={<RequireRole page="pos"><POS /></RequireRole>} />
                <Route path="/products" element={<RequireRole page="products"><Products /></RequireRole>} />
                <Route path="/inventory" element={<RequireRole page="inventory"><Inventory /></RequireRole>} />
                <Route path="/customers" element={<RequireRole page="customers"><Customers /></RequireRole>} />
                <Route path="/reports" element={<RequireRole page="reports"><Reports /></RequireRole>} />
                <Route path="/users" element={<RequireRole page="users"><Users /></RequireRole>} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
