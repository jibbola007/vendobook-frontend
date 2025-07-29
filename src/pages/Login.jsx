import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, form);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
  
      setMessage('✅ Logged in!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setMessage('❌ ' + (err.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome To VendoBook</h1>
      <p>Don't have an account? <Link to="/Signup">Create one</Link></p>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p><Link to="/forgot-password">Forgot Password?</Link></p>

    </div>
  );
}