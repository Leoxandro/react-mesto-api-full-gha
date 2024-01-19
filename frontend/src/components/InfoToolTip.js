function InfoToolTip({ onClose, isOpen, message, image }) {
    function closePopup(e, onClose) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div
            className={isOpen ? 'popup popup_opened' : 'popup'}
            onClick={(e) => closePopup(e, onClose)}
        >
          <div className="popup__container">
            <img src={message.imgPath} alt={image} className="popup__tooltip_img" />
            <button
                className="popup__btn_action_close"
                type="button"
                onClick={onClose}
            />
            <h2 className="popup__tooltip_message">{message.text}</h2>
          </div>
        </div>
    );
  }

export default InfoToolTip;