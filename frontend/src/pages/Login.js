import { useState } from "react";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (email && password) {

      localStorage.setItem(
        "loggedIn",
        "true"
      );

      onLogin();
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          AI-First CRM
        </div>

        <h2>
          Welcome Back
        </h2>

        <p>
          Log interactions with HCPs
          using AI assistance
        </p>

        <div className="login-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="rep@crm.ai"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="login-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="demo123"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Sign In
        </button>

      </div>

    </div>

  );
}

export default Login;