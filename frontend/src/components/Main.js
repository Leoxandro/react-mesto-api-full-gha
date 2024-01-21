import React, { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

function Main(props) {
  const {
    cards, 
    onCardClick, 
    onEditAvatar, 
    onEditProfile, 
    onAddPlace, 
    onCardLike, 
    onCardDelete,
    email,
    onSignOut
  } = props;
  
  
  const currentUser = useContext(CurrentUserContext);
  
  const [isMouseInside, setIsMouseInside] = useState(false);
  
  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };
  
  const handleMouseLeave = () => {
    setIsMouseInside(false);
  };
  
  const avatarEditHover = `${
    isMouseInside ? 'profile__avatar-edit active' : 'profile__avatar-edit'
  }`;

  const avatarVisibility = `${
    isMouseInside ? 'profile__avatar active' : 'profile__avatar'
  }`;

  return (
    <>
      <Header 
        title='Выход'
        email={email}
        isOpen={true}
        onSignOut={onSignOut}
      />
      <main className="content">
        <section className="profile">
          <div 
            className="profile__avatar-area"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={avatarVisibility}
              src={currentUser.avatar}
              alt={currentUser.name}
              onClick={onEditAvatar}
            />
            <button
              type="button"
              className={avatarEditHover}
              onClick={onEditAvatar}
              aria-label="Редактировать аватар профиля"
            />
          </div>
          <div className="profile__description">
            <div className="profile__info">
              <h1 className="profile__author" id="profile__author">
                {currentUser.name}
              </h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__btn profile__btn_action_edit"
                title="Кнопка редактирования профиля"
              />
            </div>
            <p
              className="profile__author-description"
              id="profile__author-description"
            >
              {currentUser.about}
            </p>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            className="profile__btn profile__btn_action_add"
            title="Кнопка добавления фото"
          />
        </section>

        <section className="elements">
        {Array.isArray(cards) && cards.map((card) => (
            <Card
              isOwn={card.owner}
              key={card._id}
              name={card.name}
              img={card.link}
              likes={card.likes}
              id={card._id}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;