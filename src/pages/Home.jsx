import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Home.css';


const COLORS = ['#4F46E5', '#22C55E', '#FACC15', '#FB923C', '#14B8A6', '#F97316'];

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expenses');
        const categoryTotals = {};

        res.data.forEach((expense) => {
          categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
        });

        const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
          name: category,
          value: total,
        }));

        setData(chartData);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <section className="home-container">
      <div className="home-intro">
        <div className="home-text">
          <h1>Welcome to <span className="highlight">VendoBook</span></h1>
          <p>
            Track your expenses with ease — add, categorize, and analyze your spending
            all in one place.
          </p>
          <div className="button-group">
            <Link to="/add" className="primary-btn">Add Expense</Link>
            <Link to="/history" className="secondary-btn">View History</Link>
          </div>
        </div>
        <div className="home-chart">
          <h2>Expense Breakdown</h2>
          <div className="chart-box">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No expense data yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;