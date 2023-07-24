import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./models/AuthContext";
import { useAuth } from "./Hooks/useAuth";
import './Home/Home.css';
import LoadingSpinner from "./models/LoadingSpinner";

const Login = React.lazy(() => import('./Login/Login'));
const Navbar = React.lazy(() => import('./Home/Navbar/Navbar'));
const LeftSidebar = React.lazy(() => import('./Home/Left-Sidebar/LeftSidebar'));
const Settings = React.lazy(() => import('./Settings/Settings'));
const Messenger = React.lazy(() => import('./Messenger/Messenger'));
const Friend = React.lazy(() => import('./Friends/Friend'));
const Feed = React.lazy(() => import('./Home/Feed'));
const Search = React.lazy(() => import('./Friends/Search'));
const UserProfile = React.lazy(() => import('./Profile/UserProfile'));
function App() {
  const { token, login, logout, userID } = useAuth();
  const auth = useContext(AuthContext);
  //route security based on if logged in or not
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/friend" element={<Friend />} />
        <Route path="/Search/:name" element={<Search />} />
        <Route path="/profile/:uID" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Feed />} />
        <Route path="/" element={<Messenger />} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Login />} />
      </React.Fragment>
    );
  }

  if (token) {
    return (

      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout }}>
        <Router>
          <div>
            <Navbar />
            <div className="home-container">
              <div>
                <LeftSidebar />
              </div>
              <div className="extender">
                <Suspense>
                  <Routes>
                    {routes}
                  </Routes>
                </Suspense>
              </div>

              <div className="messenger">
                <Messenger />
              </div>

            </div>
          </div>

        </Router>

      </AuthContext.Provider>
    );
  } else {
    return (<AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userID: userID, login: login, logout: logout }}>
      <Router>
        <Suspense fallback={
        <div className="center">
        </div>}>
          <Routes>
            {routes}
          </Routes>
        </Suspense>

      </Router>

    </AuthContext.Provider>)
  }
}

export default App;
