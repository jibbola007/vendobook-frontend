import { useState } from 'react';
import axios from 'axios';
import './AddExpense.css';

export default function AddExpense() {
  const [form, setForm] = useState({
    amount: '',
    currency: 'NGN',
    description: '',
    category: '',
    receipt: null,
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(form.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    const formData = new FormData();
    formData.append('amount', form.amount);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (form.receipt) formData.append('receipt', form.receipt);

    try {
      const response = await axios.post('http://localhost:5000/api/expenses', formData);
      console.log('✅ Expense saved:', response.data);
      setSuccess('Expense saved successfully!');
      setForm({ amount: '', description: '', category: '', receipt: null });

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('❌ Error saving expense:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">➕ Add New Expense</h2>

        {success && <div className="success-box">{success}</div>}

        <form onSubmit={handleSubmit} className="form-space">
          <div className="currency-amount-wrapper">
        <div style={{ flex: 1 }}>
        <label className="form-label">Amount</label>
        <input
      type="number"
      name="amount"
      value={form.amount}
      onChange={handleChange}
      className="form-input"
      required
    />
  </div>

  <div style={{ width: '30%' }}>
    <label className="form-label">Currency</label>
    <select
      name="currency"
      value={form.currency}
      onChange={handleChange}
      className="form-input"
    >
      <option value="NGN">₦ NGN</option>
      <option value="USD">$ USD</option>
      <option value="EUR">€ EUR</option>
      <option value="GBP">£ GBP</option>
      <option value="KES">Ksh KES</option>
    </select>
  </div>
</div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="form-input"
              required
            ></textarea>
          </div>

          <div>
            <label className="form-label">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="form-label">Receipt (optional)</label>
            <input
              type="file"
              name="receipt"
              accept="image/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Expense
          </button>
        </form>
      </div>
    </div>
  );
}