import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Em breve colocaremos a rota /campaigns aqui */}
      </Routes>
    </Router>
  );
}

export default App;
