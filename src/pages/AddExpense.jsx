import { useState } from 'react';
import axios from 'axios';


export default function AddExpense() {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: '',
    receipt: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('amount', form.amount);
    formData.append('description', form.description);
    formData.append('category', form.category);
    if (form.receipt) {
      formData.append('receipt', form.receipt);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/expenses', formData);
      console.log('✅ Expense saved:', response.data);
      alert('Expense saved!');
  
      setForm({ amount: '', description: '', category: '', receipt: null });
    } catch (error) {
      console.error('❌ Error saving expense:', error);
      alert('Something went wrong.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">➕ Add Expense</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (₦)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-sm font-medium text-gray-700">Receipt Image (optional)</label>
          <input
            type="file"
            name="receipt"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
}