import { Routes, Route } from 'react-router-dom';import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ExpenseHistory from './pages/ExpenseHistory';
import Summary from './pages/Summary';
import EditExpense from './pages/EditExpense';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/history" element={<ExpenseHistory />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
 
export default App;