import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditExpense.css'; // Optional: If you prefer separating styles

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    receipt: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expenses/${id}`)
      .then((res) => {
        setExpense(res.data);
        setFormData({
          amount: res.data.amount,
          description: res.data.description,
          category: res.data.category,
          receipt: null,
        });
      })
      .catch((err) => console.error('❌ Error loading expense:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'receipt') {
      setFormData({ ...formData, receipt: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('amount', formData.amount);
    updateData.append('description', formData.description);
    updateData.append('category', formData.category);
    if (formData.receipt) {
      updateData.append('receipt', formData.receipt);
    }

    try {
      await axios.put(`http://localhost:5000/api/expenses/${id}`, updateData);
      navigate('/history');
    } catch (err) {
      console.error('❌ Failed to update expense:', err);
    }
  };

  if (!expense) return <p className="loading-msg">Loading...</p>;

  return (
    <div className="edit-container">
      <h2 className="edit-title">✏️ Edit Expense</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Amount (₦)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Groceries">Groceries</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>

        <label>New Receipt (optional)</label>
        <input
          type="file"
          name="receipt"
          onChange={handleChange}
          accept="image/*"
        />

        <div className="button-group">
          <button type="submit" className="btn green">✅ Update</button>
          <button type="button" className="btn gray" onClick={() => navigate('/history')}>
            ⬅ Back to History
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;