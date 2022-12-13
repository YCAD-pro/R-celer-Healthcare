import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length >= 3 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToLogin = { email, password };

    fetch("http://localhost:3080/login", {
      method: "POST",
      body: JSON.stringify({ user: email, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          console.log("token", json, "go to next page");
        }
      });

    console.log(
      "Send de username = " +
        dataToLogin.email +
        " | password = " +
        dataToLogin.password
    );
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span>{error}</span>}

            <h2>Connection</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Username or Email</label>
              </div>

              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              {btn ? (
                <button>Connection</button>
              ) : (
                <button disabled>Connection</button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/create">
                No account ? Subscribe now.
              </Link>
              <br />
              <Link className="simpleLink" to="/forgotpassword">
                Forgot password ? click here.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
