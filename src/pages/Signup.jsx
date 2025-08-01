import { useState } from 'react';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/Signup`,
        form
      );
      localStorage.setItem('token', res.data.token);
      setMessage('✅ Account created successfully!');
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Error signing up'));
    }
  };

  return (
    <div className="form-card">
      <h2>Create Account</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {message.includes('successfully') && (
        <button onClick={() => (window.location.href = '/Login')} style={{ marginTop: '1rem' }}>
          Go to Login
        </button>
      )}
    </div>
  );
}