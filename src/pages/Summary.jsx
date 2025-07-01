import { useEffect, useState } from 'react';
import axios from 'axios';

const Summary = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    count: 0,
    categoryTotals: {}
  });

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

  useEffect(() => {
    if (expenses.length > 0) {
      const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
      const categoryTotals = {};

      expenses.forEach(exp => {
        if (!categoryTotals[exp.category]) {
          categoryTotals[exp.category] = 0;
        }
        categoryTotals[exp.category] += exp.amount;
      });

      setSummary({
        totalAmount,
        count: expenses.length,
        categoryTotals
      });
    }
  }, [expenses]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Summary</h2>
      <p className="text-lg">Total Expenses: {summary.count}</p>
      <p className="text-lg">Total Spent: ₦{summary.totalAmount.toFixed(2)}</p>

      <h3 className="text-xl font-semibold mt-6">Category Breakdown:</h3>
      <ul className="mt-2">
        {Object.entries(summary.categoryTotals).map(([category, total]) => (
          <li key={category} className="border p-2 rounded mt-1">
            {category}: ₦{total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;