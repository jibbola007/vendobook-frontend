import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    axios.get(`http://localhost:5000/api/expenses/${id}`)
      .then(res => {
        setExpense(res.data);
        setFormData({
          amount: res.data.amount,
          description: res.data.description,
          category: res.data.category,
          receipt: null, // leave file empty by default
        });
      })
      .catch(err => console.error('❌ Error loading expense:', err));
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

  if (!expense) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="receipt"
          onChange={handleChange}
          className="w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditExpense;