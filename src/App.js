import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import EditPage from './components/EditPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:nodeId" element={<EditPage />} />
      </Routes>
    </Router>
  );
}



export default App;
