import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExpenseHistory.css';

const currencySymbols = {
  NGN: '₦',
  USD: '$',
  EUR: '€',
  GBP: '£',
  KES: 'Ksh',
};


// Helpers
const getWeekNumber = (date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date - start) + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
};

const groupByMonth = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const date = new Date(expense.createdAt);
    const label = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!groups[label]) groups[label] = [];
    groups[label].push(expense);
    return groups;
  }, {});
};

const groupByWeek = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const date = new Date(expense.createdAt);
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    const label = `Week ${week}, ${year}`;
    if (!groups[label]) groups[label] = [];
    groups[label].push(expense);
    return groups;
  }, {});
};

const ExpenseHistory = () => {
  const navigate = useNavigate();
  const [allExpenses, setAllExpenses] = useState([]);
  const [visibleReceipts, setVisibleReceipts] = useState({});
  const [groupBy, setGroupBy] = useState('month');
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expenses');
        setAllExpenses(res.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    let filtered = [...allExpenses];
  
    if (selectedMonth && selectedYear) {
      filtered = filtered.filter((expense) => {
        const date = new Date(expense.createdAt);
        return (
          date.getMonth() + 1 === parseInt(selectedMonth) &&
          date.getFullYear() === parseInt(selectedYear)
        );
      });
    }
  
    const grouped = groupBy === 'week' ? groupByWeek(filtered) : groupByMonth(filtered);
    setGroupedExpenses(grouped);
  }, [groupBy, allExpenses, selectedMonth, selectedYear]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setAllExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const toggleReceipt = (id) => {
    setVisibleReceipts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="history-container">
      <h2 className="history-title">📜 Expense History</h2>

      <div className="filter-controls">
  <label>Month:</label>
  <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
    <option value="">--</option>
    {Array.from({ length: 12 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {new Date(0, i).toLocaleString('default', { month: 'long' })}
      </option>
    ))}
  </select>

  <label>Year:</label>
  <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
    <option value="">--</option>
    {Array.from({ length: 36 }, (_, i) => {
      const year = 2025 + i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>
</div>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="no-expenses">No expenses found.</p>
      ) : (
        Object.entries(groupedExpenses).map(([period, expenses]) => (
          <div key={period} className="expense-group">
            <h3 className="expense-group-title">{period}</h3>
            <ul className="expense-list">
              {expenses.map((expense) => (
                <li key={expense._id} className="expense-card">
                  <div className="expense-details">
                    
                  <p>
                  <strong>Amount:</strong> {currencySymbols[expense.currency] || '₦'}{expense.amount}
                  </p>
                    <p><strong>Description:</strong> {expense.description}</p>
                    <p><strong>Category:</strong> {expense.category}</p>
                    <p><strong>Date:</strong> {new Date(expense.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="expense-actions">
                    {expense.receipt && (
                      <>
                        <button className="link-btn" onClick={() => toggleReceipt(expense._id)}>
                          {visibleReceipts[expense._id] ? 'Hide Receipt' : 'View Receipt'}
                        </button>
                        {visibleReceipts[expense._id] && (
                          <img
                            src={`http://localhost:5000/uploads/${expense.receipt}`}
                            alt="Receipt"
                            className="receipt-image"
                          />
                        )}
                      </>
                    )}

                    <button className="btn red" onClick={() => handleDelete(expense._id)}>
                      Delete
                    </button>
                    <button className="btn blue" onClick={() => navigate(`/edit/${expense._id}`)}>
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseHistory;