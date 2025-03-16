import { useState } from "react";
import LoginForm from "../../components/AuthForms/LoginForm";
import SignUpForm from "../../components/AuthForms/SignUpForm";

function AuthPage({ setUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);

  function togglePage() {
    setSignUp(!signUp);
    setError(null);
  }

  return (
    <div className="auth-page">
      <h1>{signUp ? "Sign Up" : "Log In"} to Your Account</h1>
      {error && <p className="error">{error}</p>}
      {signUp ? (
        <SignUpForm setUser={setUser} setError={setError} />
      ) : (
        <LoginForm setUser={setUser} setError={setError} />
      )}
      <div className="auth-toggle">
        <h2>
          {signUp ? "Already have an account?" : "Don't have an account?"}
        </h2>
        <button onClick={togglePage}>{signUp ? "Log In" : "Sign Up"}</button>
      </div>
    </div>
  );
}

export default AuthPage;
