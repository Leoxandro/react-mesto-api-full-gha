import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card.name ? "popup popup-photo popup_opened" : "popup popup-photo"
      }
    >
      <div className="popup__overlay">
        <div className="popup__container popup__photo-container">
          <button
            onClick={onClose}
            type="button"
            title="Закрыть окно без сохранения"
            className="popup__btn popup__btn_action_close popup__btn_action_close-img"
          />
          <img
            className="popup__img"
            alt={card.name}
            src={card.img}
          />
          <p className="popup__description">{card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
