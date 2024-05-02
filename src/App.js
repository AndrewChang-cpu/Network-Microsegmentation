import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import EditPage from './components/EditPage';
import AddPage from './components/AddPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:nodeId" element={<EditPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </Router>
  );
}



export default App;
