import React, { useEffect, useState } from "react";
import { useJwt, decodeToken } from "react-jwt";

const ConnectionDataComponent = () => {
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
  }, [password, email, btn]);

  const setUserInformations = (userInfos) => {
    console.log(userInfos);
    localStorage.setItem("username", userInfos.user);
    localStorage.setItem("status", userInfos.role);
    localStorage.setItem("id", userInfos.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToLogin = { email, password };

    fetch("http://localhost:3080/login", {
      method: "POST",
      body: JSON.stringify({ user: email, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
      .then((data) => {
        if (data) {
          setUserInformations(decodeToken(data.tokenUser));
          localStorage.setItem("token", data.tokenUser);
          setTimeout(() => {
            refreshPage();
          }, 200);
        }
      })
      .catch((err) => {
        setError("Username or password are incorrect");
        console.error("Error send by the backend :", err);
      });

    console.log(
      "Send de username = " +
        dataToLogin.email +
        " | password = " +
        dataToLogin.password
    );
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      {localStorage.length === 0 ? (
        <>
          <div className="container-fluid signUpLoginBox">
            <div className="slContainer">
              <div className="formBoxLeftLogin"></div>
              <div className="formBoxRight">
                <div className="formContent">
                  {error !== "" && <span className="text-danger">{error}</span>}

                  <h2>Connection</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                      <input
                        id="usernameField"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="email">Username</label>
                    </div>

                    <div className="inputBox">
                      <input
                        id="passwordField"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    {btn ? (
                      <button id="validBtn">Connection</button>
                    ) : (
                      <button disabled>Connection</button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section>
          <h1 id="titleConnected">Hello "{localStorage.username}"!</h1>
          <br />
        </section>
      )}
    </>
  );
};
export default ConnectionDataComponent;
