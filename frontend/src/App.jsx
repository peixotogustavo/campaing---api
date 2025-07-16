import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CampaignList from './pages/CampaignList';
import PrivateRoute from './components/PrivateRoute';
import CampaignForm from './pages/CampaignForm';
import CampaignEdit from './pages/CampaignEdit';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/campaigns"
          element={
            <PrivateRoute>
              <CampaignList />
            </PrivateRoute>
          }
        />

        <Route
          path="/campaigns/new"
          element={
            <PrivateRoute>
              <CampaignForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/campaigns/edit/:id"
          element={
            <PrivateRoute>
              <CampaignEdit />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
