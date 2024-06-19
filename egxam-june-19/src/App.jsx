import { useState } from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
// import { Home } from './components/homepage'
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/userDashboard/userDashboard";
import PrivateRoute from "./routes/privateRoutes";
import { AuthContext } from "./utils/AuthContext";
// import ExplorePage from './components/search/ExplorePage';
// import { SearchProvider } from './components/search/hooks/useSearch';
import "./App.css";
import Header from './components/Header'
import { Home } from "./components/homepage";



function App() {
  const { user: authUser, logoutUser } = useContext(AuthContext);
  return (
    // <Router>
    //   <div class='main'>

    //   <Header />
    //   <Routes>
    //     <Route path='/login' element={<LoginForm />} />
    //     <Route path='/signup' element={<RegisterForm />} />
    //     <Route path='/' element={<Home />} />

    //   </Routes>
    //   </div>

    // </Router>
    <Router>
      <div className='main'>

        <Header />

        <div className='main-content'>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path='/signup' element={<RegisterForm />} />
          
            <Route path="/" element={<Home />} />
           
            <Route path="/explore" element={
              <PrivateRoute>
                <SearchProvider>
                  <ExplorePage />
                </SearchProvider>
              </PrivateRoute>} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <Page />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router >
  )
}

export default App;
