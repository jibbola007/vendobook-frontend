import { Routes, Route } from 'react-router-dom';import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ExpenseHistory from './pages/ExpenseHistory';
import Summary from './pages/Summary';
import EditExpense from './pages/EditExpense';
import Navbar from './components/Navbar';


function App() {
  return (
      
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/history" element={<ExpenseHistory />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
      </div>
  
  );
}
 
export default App;