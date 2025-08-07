import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { HomePage } from './components/pages/HomePage/HomePage';
import { RedirectHandler } from './components/pages/RedirectHandler/RedirectHandler';
import { NotFound } from './components/pages/NotFound/Notfound';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas específicas */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/not-found" element={<NotFound />} />

          {/* Rutas privadas */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Redirección raíz */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Ruta dinámica de slug (debe estar abajo de todo) */}
          <Route path="/:slug" element={<RedirectHandler />} />

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;