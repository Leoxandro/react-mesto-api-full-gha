import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useForm } from "./hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: currentUser.name || "",
    about: currentUser.about || "",
  });
 
  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name || "",
        about: currentUser.about || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <input
        id="name"
        className="popup__item"
        name="name"
        type="text"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        value={values.name}
        onChange={handleChange}
      />
      <span 
        id="name-input-error" 
        className="popup__input-error" 
      ></span>
      <input
        id="description"
        className="popup__item"
        name="description"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values.about}
        onChange={handleChange}
      />
      <span 
        id="name-input-error" 
        className="popup__input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
