import { createContext, useContext, useState } from "react";

// Dummy user accounts — in a real app these come from a backend
export const DUMMY_USERS = [
  { id: 1, name: "Alice Admin",   email: "admin@gmail.com",   password: "admin123",   role: "admin",   storeName: "ShopPOS HQ" },
  { id: 2, name: "Mark Manager",  email: "manager@gmail.com", password: "manager123", role: "manager", storeName: "ShopPOS HQ" },
  { id: 3, name: "Casey Cashier", email: "cashier@gmail.com", password: "cashier123", role: "cashier", storeName: "ShopPOS HQ" },
];

// What each role can access
export const ROLE_PERMISSIONS = {
  admin:   ["dashboard", "pos", "products", "inventory", "customers", "reports", "users"],
  manager: ["pos", "products", "inventory", "reports"],
  cashier: ["pos"],
};

export const canAccess = (role, page) =>
  ROLE_PERMISSIONS[role]?.includes(page) ?? false;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pos_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = DUMMY_USERS.find(
      u => u.email === email && u.password === password
    );
    if (!found) return { success: false, message: "Invalid email or password." };
    const { password: _, ...safeUser } = found;
    localStorage.setItem("pos_user", JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true, user: safeUser };
  };

  const logout = () => {
    localStorage.removeItem("pos_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, canAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
