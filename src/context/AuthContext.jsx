import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🟡 Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, email: decoded.email });
      } catch (err) {
        console.error('Invalid token');
        localStorage.removeItem('token');
        setUser(null);
      }
    }

    setLoading(false); // ✅ We're done checking
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, email: decoded.email });
      localStorage.setItem('token', token);
    } catch (err) {
      console.error("Failed to decode and login:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);