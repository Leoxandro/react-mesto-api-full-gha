import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  const navigate = useNavigate();
  function onNavLogin() {
    navigate('/sign-in', { replace: true });
  }

  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={onRegister}
      onSwitch={onNavLogin}
      switchText="Уже зарегистрированы?"
    />
  );
}

export default Register;