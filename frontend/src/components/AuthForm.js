import React, { useState } from "react";
import Header from "./Header";

function AuthForm({ title, onSubmit, buttonText, onSwitch, switchText }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      email,
      password,
    });
  };

  const handleSwitch = () => {
    onSwitch();
  };

  return (
    <>
      <Header title={switchText} onClick={handleSwitch} />
      <main className="content">
        <form className="auth__form" onSubmit={handleSubmit}>
          <h2 className="auth__title">{title}</h2>
          <input
            className="auth__form-input"
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
            maxLength="40"
            minLength="2"
            required
          ></input>
          <input
            className="auth__form-input"
            placeholder="Пароль"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            maxLength="40"
            minLength="2"
            required
          ></input>
          <button className="auth__form-submit-btn" type="submit">
            {buttonText}
          </button>
          {switchText && (
            <div className="auth__signin">
              <p className="auth__signin_text">{switchText}</p>
              <button
                className="auth__signin_btn"
                type="button"
                onClick={handleSwitch}
              >
                Войти
              </button>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default AuthForm;