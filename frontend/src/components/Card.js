import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ 
  name,
  img,
  id,
  isOwn,
  likes, 
  onCardClick, 
  onCardLike, 
  onCardDelete 
  }) => {
  const currentUser = useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick({ name, img });
  }

  function handleLikeClick() {
    onCardLike({ likes, id });
  }

  function handleCardDelete() {
    onCardDelete({ id });
  }

  const isOwnCard = isOwn._id === currentUser._id;
  const cardDeleteBtnRender = (`${
    isOwnCard ? 'element__delete-btn' : 'element__delete-btn hidden'
  }`);


  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = (`${
    isLiked ? 'element__like-btn active' : 'element__like-btn' 
  }`);

  return (
    <div className="element">
      <img
        className="element__img"
        alt={name}
        src={img}
        onClick={handleCardClick}
      />
      <button
        onClick={handleCardDelete}
        type="button"
        className={cardDeleteBtnRender}
        title="кнопка удаления"
      ></button>
      <div className="element__group">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-area">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
            title="кнопка 'лайк'"
          ></button>
          <p className="element__like-counter">{likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
