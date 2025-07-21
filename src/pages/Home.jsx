import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './Home.css'; // assuming this contains your custom styles

// ===== Helper Functions =====
const getWeekNumber = (date) => {
  const tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const firstDayOfYear = new Date(tempDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (tempDate - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const groupExpensesBy = (expenses, range = 'day') => {
  const grouped = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.createdAt);

    let key;
    switch (range) {
      case 'week':
        const week = getWeekNumber(date);
        key = `${date.getFullYear()}-W${week}`;
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'year':
        key = `${date.getFullYear()}`;
        break;
      default:
        key = date.toISOString().split('T')[0]; // daily
    }

    grouped[key] = (grouped[key] || 0) + parseFloat(expense.amount);
  });

  return Object.entries(grouped).map(([date, total]) => ({
    date,
    total,
  }));
};

// ===== Component =====
const Home = () => {
  const [range, setRange] = useState('day');
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expenses');
        console.log('📦 Raw expense data:', res.data);

        const grouped = groupExpensesBy(res.data, range);
        setGroupedData(grouped);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, [range]);

  return (
    <div className="home-container">
      <div className="home-intro">
        <div className="home-text">
          <h1>
            Welcome to <span className="highlight">VendoBook</span>
          </h1>
          <p>
            Your smart expense tracker — log your daily expenses, upload receipts,
            and monitor your spending in real-time.
          </p>
          <div className="home-image">
      <img src="/hero-illustration.png" alt="Finance Illustration" />
      </div>
          
        </div>
        {/* Optional: Insert a hero image here if needed */}
      </div>

      
      <div className="home-chart-container">
      <div className="home-chart">
        <h2>Expense Chart</h2>

        {/* 🔽 Range Selector */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{
            marginBottom: '12px',
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>

        <div className="chart-box">
          {groupedData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupedData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No expense data yet.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;