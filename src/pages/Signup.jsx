import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
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
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}