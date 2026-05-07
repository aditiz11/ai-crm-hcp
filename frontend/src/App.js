import "./App.css";

import { useState } from "react";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

function App() {

  const [loggedIn, setLoggedIn] =
    useState(
      localStorage.getItem("loggedIn")
      === "true"
    );

  return (

    <div className="app-container">

      {
        loggedIn ? (

          <Dashboard />

        ) : (

          <Login
            onLogin={() =>
              setLoggedIn(true)
            }
          />

        )
      }

    </div>

  );
}

export default App;