import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CampaignList from './pages/CampaignList';
import PrivateRoute from './components/PrivateRoute';
import CampaignForm from './pages/CampaignForm';
import CampaignEdit from './pages/CampaignEdit';
import InfluencerList from './pages/InfluencerList';
import InfluencerForm from './pages/InfluencerForm';

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

        <Route
          path="/influencers"
          element={
            <PrivateRoute>
              <InfluencerList />
            </PrivateRoute>
          }
        />

        <Route
          path="/influencers/edit/:id"
          element={
            <PrivateRoute>
              <InfluencerForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
