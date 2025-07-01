import { useEffect, useState } from 'react';
import axios from 'axios';


const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [visibleReceipts, setVisibleReceipts] = useState({});
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(res.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const toggleReceipt = (id) => {
    setVisibleReceipts((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle visibility for this specific expense
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expense History</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense._id} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div className="flex-1">
                <p><strong>Amount:</strong> ₦{expense.amount}</p>
                <p><strong>Description:</strong> {expense.description}</p>
                <p><strong>Category:</strong> {expense.category}</p>
                <p><strong>Date:</strong> {new Date(expense.createdAt).toLocaleString()}</p>
              </div>
          
              <div className="flex flex-col items-center gap-2">
              {expense.receipt && (
  <>
    <button
      className="text-blue-500 underline text-sm"
      onClick={() => toggleReceipt(expense._id)}
    >
      {visibleReceipts[expense._id] ? 'Hide Receipt' : 'View Receipt'}
    </button>

    {visibleReceipts[expense._id] && (
      <img
        src={`http://localhost:5000/uploads/${expense.receipt}`}
        alt="Receipt"
        className="w-32 h-32 object-cover border rounded mt-2"
      />
    )}
  </>
)}

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default ExpenseHistory;