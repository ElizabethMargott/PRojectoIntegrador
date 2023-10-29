import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavbarComponent as Navbar } from "./components/NavbarComponent";
import { FooterComponent as Footer } from "./components/FooterComponent";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { NotesPage } from "./pages/Notes/NotesPage";
import { NoteFormPage } from "./pages/Notes/NoteFormPage";
import { ListsPage } from "./pages/Lists/ListsPage";
import { KanbanPage } from "./pages/Kanban/KanbanPage";
import { CalendarPage } from "./pages/Calendar/CalendarPage";
import { HabitsPage } from "./pages/Habits/HabitsPage";
import { ProfilePage } from "./pages/User/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import PropTypes from 'prop-types';
import "./App.css";

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

      {/* Routes */}
      <BrowserRouter>
        {/* Header (Navbar) */}
        {isAuthenticated() && <Navbar />}
        <Routes>
          <Route
            path="/notes"
            element={<PrivateRoute element={<NotesPage />} fallbackPath="/login" />}
          />
          <Route
            path="/notes-create"
            element={<PrivateRoute element={<NoteFormPage />} fallbackPath="/login" />}
          />
          <Route
            path="/notes/:id"
            element={<PrivateRoute element={<NoteFormPage />} fallbackPath="/login" />}
          />
          <Route
            path="/notes-delete"
            element={<PrivateRoute element={<NoteFormPage />} fallbackPath="/login" />}
          />
          <Route
            path="/lists"
            element={<PrivateRoute element={<ListsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/lists-create"
            element={<PrivateRoute element={<ListsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/lists-update"
            element={<PrivateRoute element={<ListsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/lists-delete"
            element={<PrivateRoute element={<ListsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/kanban"
            element={<PrivateRoute element={<KanbanPage />} fallbackPath="/login" />}
          />
          <Route
            path="/kanban-create"
            element={<PrivateRoute element={<KanbanPage />} fallbackPath="/login" />}
          />
          <Route
            path="/kanban-update"
            element={<PrivateRoute element={<KanbanPage />} fallbackPath="/login" />}
          />
          <Route
            path="/kanban-delete"
            element={<PrivateRoute element={<KanbanPage />} fallbackPath="/login" />}
          />
          <Route
            path="/calendar"
            element={<PrivateRoute element={<CalendarPage />} fallbackPath="/login" />}
          />
          <Route
            path="/habits"
            element={<PrivateRoute element={<HabitsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/habits-create"
            element={<PrivateRoute element={<HabitsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/habits-update"
            element={<PrivateRoute element={<HabitsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/habits-delete"
            element={<PrivateRoute element={<HabitsPage />} fallbackPath="/login" />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} fallbackPath="/login" />}
          />
          <Route
            path="/login"
            element={<PublicRoute element={<LoginPage />} fallbackPath="/notes" />}
          />
          <Route
            path="/register"
            element={<PublicRoute element={<RegisterPage />} fallbackPath="/notes" />}
          />
          <Route
            path="/logout"
            element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" replace={true} />}
          />
          <Route
            path="*"
            element={<RedirectTo path={isAuthenticated() ? "/notes" : "/login"} />}
          />
        </Routes>
        <Toaster />

        {/* Footer */}
        {isAuthenticated() && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;

//imagen y redireccionamiento correcto dsde el navbar y el foterr y el uso de Link, se puede acceder con el mismo token que usarte antes de hacer el logout? xd