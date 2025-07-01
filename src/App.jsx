import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ExpenseHistory from './pages/ExpenseHistory';
import Summary from './pages/Summary';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="font-bold text-xl">VendoBook</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/add" className="hover:underline">Add</Link>
          <Link to="/history" className="hover:underline">History</Link>
          <Link to="/summary" className="hover:underline">Summary</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/history" element={<ExpenseHistory />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </div>
  );
}

export default App;