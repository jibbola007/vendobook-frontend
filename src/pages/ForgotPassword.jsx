import { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email: form.email,
        password: form.password,
      });

      setMessage('✅ Password reset successfully. You can now log in.');
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Reset failed'));
    }
  };

  return (
    <div className="form-card">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirm"
          type="password"
          placeholder="Confirm New Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message.includes('successful') && (
      <button onClick={() => window.location.href = '/login'}>
      Go to Login
       </button>
     )}
    </div>
  );
}