import { useState } from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
// import { Home } from './components/homepage'
import LoginForm from "./components/LoginForm";
// import UserDashboard from "./components/userDashboard/UserDashboard";
import PrivateRoute from "./routes/privateRoutes";
import { AuthContext } from "./utils/AuthContext";
// import ExplorePage from './components/search/ExplorePage';
// import { SearchProvider } from './components/search/hooks/useSearch';
import "./App.css";

function App() {
  const { user: authUser, logoutUser } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        
      </Routes>

    </Router>
  )
}

export default App;
