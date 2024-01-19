import React from "react";

function PopupWithForm({ 
  onSubmit, 
  onClose, 
  name, 
  children, 
  title, 
  isOpen,
  buttonText
}) {
  return (
    <div
      className={`popup popup_type_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          title="Закрыть окно без сохранения"
          className="popup__btn popup__btn_action_close"
          onClick={onClose}
        />
        <h2 className="popup__heading">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          id={`${name}-form`}
          noValidate=""
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            title="Сохранить данные и закрыть окно"
            className="popup__btn popup__btn_action_submit"
          >
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
