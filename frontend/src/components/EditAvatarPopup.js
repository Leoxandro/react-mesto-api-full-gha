import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const avatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Подтвердить"}
    >
      <input
        ref={avatarRef}
        id="avatar"
        className="popup__item"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="avatar-input-error" className="popup__input-error" />
    </PopupWithForm>
  );
}


export default EditAvatarPopup;
