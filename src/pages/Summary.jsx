import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import './Summary.css';

const currencySymbols = {
  NGN: '₦',
};

const Summary = () => {
  const { currency } = useCurrency();

  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    count: 0,
    categoryTotals: {}
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`);
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
    <div className="summary-container">
      <h2 className="summary-title">📊 Expense Summary</h2>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>{summary.count}</p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p>
            {currencySymbols[currency] || '₦'}
            {Number(summary.totalAmount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>
      </div>

      <h3 className="breakdown-title">🗂 Category Breakdown</h3>
      <div className="category-grid">
        {Object.entries(summary.categoryTotals).map(([category, total]) => (
          <div key={category} className="category-card">
            <span className="category-name">{category}</span>
            <span className="category-amount">
              {currencySymbols[currency] || '₦'}
              {Number(total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;