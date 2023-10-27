import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavbarComponent as Navbar } from "./components/NavbarComponent";
import { FooterComponent as Footer } from "./components/FooterComponent";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotesPage } from "./pages/NotesPage";
import { NoteFormPage } from "./pages/NoteFormPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import PropTypes from 'prop-types';
import "./App.css";
import { LogoutButton } from './components/LogoutButtonComponent';

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Devuelve true si hay un token, de lo contrario, false
};

const PrivateRoute = ({ element, fallbackPath }) => {
  return isAuthenticated() ? element : <Navigate to={fallbackPath} replace={true} />;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  fallbackPath: PropTypes.string.isRequired,
};

const PublicRoute = ({ element, fallbackPath }) => {
  return !isAuthenticated() ? element : <Navigate to={fallbackPath} replace={true} />;
};

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
  fallbackPath: PropTypes.string.isRequired,
};

const RedirectTo = ({ path }) => <Navigate to={path} replace={true} />;

RedirectTo.propTypes = {
  path: PropTypes.string.isRequired,
};

function App() {
  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/notes" element={<PrivateRoute element={<NotesPage />} fallbackPath="/login" />} />
          <Route path="/notes-create" element={<PrivateRoute element={<NoteFormPage />} fallbackPath="/login" />} />
          <Route path="/notes-update" element={<PrivateRoute element={<NoteFormPage />} fallbackPath="/login" />} />
          <Route path="/notes-delete" element={<PrivateRoute element={<NoteFormPage />} fallbackPath="/login" />} />
          <Route path="/login" element={<PublicRoute element={<LoginPage />} fallbackPath="/notes" />} />
          <Route path="/register" element={<PublicRoute element={<RegisterPage />} fallbackPath="/notes" />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="*" element={<RedirectTo path={isAuthenticated() ? "/notes" : "/login"} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>

      {/* Footer */}
      <Footer />

    </>
  );
}

export default App;

//imagen y redireccionamiento correcto dsde el navbar y el foterr y el uso de Link, se puede acceder con el mismo token que usarte antes de hacer el logout? xd