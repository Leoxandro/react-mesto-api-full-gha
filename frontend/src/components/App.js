import React, { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import loadingImg from "../images/loadingImg.gif";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from "./Register.js";
import Login from "./Login.js";
import InfoToolTip from "./InfoToolTip.js";
import * as auth from '../utils/auth';
import Main from './Main';
import AccessIcon from '../images/AccessIcon.svg';
import DenyIcon from '../images/DenyIcon.svg';
import MainContent from "./MainContent.js";


function App() {

  // Declaring constants

  const [currentUser, setCurrentUser] = useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: loadingImg,
  });

  const [selectedCard, setSelectedCard] = useState({
    name: "",
    img: "",
  });

  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const [isUpdateEditAvatarPopupOpen, setUpdateEditAvatarPopupOpen] =
  useState(false);
  const [isUpdateEditProfilePopupOpen, setUpdateEditProfilePopupOpen] =
  useState(false);
  const [isUpdateAddPlacePopupOpen, setUpdateAddPlacePopupOpen] =
  useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] =
  useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    imgPath: '',
    text: '',
  });



  // Getting user info and initial cards package

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Возникла глобальная ошибка, ${err}`);
        });
      }
    }, [isLoggedIn]);

  // Open All Popups

  function handleEditAvatarClick() {
    setUpdateEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setUpdateEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setUpdateAddPlacePopupOpen(true);
  }

  function handleCardClick({ name, img }) {
    setSelectedCard({
      name,
      img,
    });
  }

  // Close All Popups

  function closeAllPopups() {
    setUpdateAddPlacePopupOpen(false);
    setUpdateEditAvatarPopupOpen(false);
    setUpdateEditProfilePopupOpen(false);
    setInfoToolTipPopupOpen(false);

    setSelectedCard({
      name: "",
      img: "",
    });

  }

  // Close popups with ESC

  const isOpen =
   isUpdateAddPlacePopupOpen ||
   isUpdateEditProfilePopupOpen ||
   isUpdateEditAvatarPopupOpen ||
   isInfoToolTipPopupOpen ||
   selectedCard;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen])


  // Like card function

  function handleCardLike({ likes, _id }) {
    console.log('Likes:', likes);
  
    const isLiked = likes ? likes.some((i) => i._id === currentUser._id) : false;
  
    console.log('isLiked:', isLiked);
  
    api.changeLikeCardStatus(_id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        console.log('New Card:', newCard);
        setCards((cards) =>
          cards.map((c) => (c._id === _id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка установки/уборки лайка, ${err}`);
      });
  }


  // Delete card function 

  function handleCardDelete({ id }) {
    api.deleteCard(id).then((newCard) => {
      const newCardArr = cards.filter((c) => c._id !== id)
      setCards(newCardArr)
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки, ${err}`)
    });
  }


  // Update and submit functions 

  function handleUpdateUser(e) {
    api.sendUserData(e).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(`Ошибка обновления данных пользователя, ${err}`)
    });
  }

  function handleUpdateAvatar(e) {
    api.sendAvatarData(e).then((res) => {
      setCurrentUser({
        avatar: res.avatar
      })
      closeAllPopups()
    }).catch((err) => {
      console.log(`Возникла ошибка обновления аватара, ${err}`);
    });
  }

  function handleAddPlaceSubmit(e) {
    api.addNewCard({
      name: e.place,
      link: e.link
    })
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(`Ошибка добавления места, ${err}`)
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log('401 — Токен не передан или передан не в том формате');
          }
          console.log('400 — Переданный токен некорректен');
        });
    }
  }, [navigate]);

  function onLogin({ password, email }) {
    auth
      .authorize({ password, email })
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true});
    })
    .catch(() => {
      setInfoToolTipPopupOpen(true);
      setMessage({
        imgPath: DenyIcon,
        text: "Что-то пошло не так! Попробуйте ещё раз.",
      });
    });
  }

  function onRegister({ password, email }) {
    auth
      .register({ password, email })
      .then((res) => {
        setInfoToolTipPopupOpen(true);
        navigate('/sign-in');
        setEmail(res.data.email);
        setMessage({
          imgPath: AccessIcon,
          text: "Вы успешно зарегистрировались!",
        });
        if (res.jwt) {
          setIsLoggedIn(true);
          sessionStorage.setItem('jwt', res.jwt);
        }
    })
    .catch((err) => {
      setInfoToolTipPopupOpen(true);
      setMessage({
        imgPath: DenyIcon,
        text: "Что-то пошло не так! Попробуйте ещё раз.",
      });
    });
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(true);
    navigate('/sign-in');
    localStorage.clear();
  };


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <MainContent>
          <Routes>
            <Route 
              path="/sign-in" 
              element={<Login onLogin={onLogin} />}
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={onRegister} />}
            />
            <Route
              path='/'
              element={
                <ProtectedRoute 
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  email={email}
                  onSignOut={onSignOut}
                />
              }
            />
          </Routes>
        </MainContent>      
        <EditAvatarPopup
          isOpen={isUpdateEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isUpdateEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isUpdateAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          message={message}
        />    
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
