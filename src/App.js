import "./App.css";
import { createContext, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";

export const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <div className="bg-[#090900] min-h-screen m-0 p-0">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/*" element={<h3>Page not found</h3>}></Route>
            </Routes>
          </Router>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
