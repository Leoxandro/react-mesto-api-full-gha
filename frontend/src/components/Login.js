import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  const navigate = useNavigate();
  function onNavRegister() {
    navigate('/sign-up', { replace: true });
  }

  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onSubmit={onLogin}
      onSwitch={onNavRegister}
      switchText=""
    />
  );
}

export default Login;