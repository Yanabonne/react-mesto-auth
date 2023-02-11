import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmCardDeletePopup from "./ConfirmCardDeletePopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import { FormValidator } from "../utils/FormValidator.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { validationObject } from "../utils/constants.js";
import { register, authorize, getUserContent } from "../Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [headerText, setHeaderText] = React.useState("Регистрация");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    React.useState(false);

  const navigate = useNavigate();

  const formValidatorProfile = new FormValidator(
    validationObject,
    document.querySelector("#form-profile")
  );
  const formValidatorMesto = new FormValidator(
    validationObject,
    document.querySelector("#form-mesto")
  );
  const formValidatorProfileImage = new FormValidator(
    validationObject,
    document.querySelector("#form-profile-image")
  );

  function handleEditAvatarClick() {
    formValidatorProfileImage.enableValidation();
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    formValidatorProfile.enableValidation();
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    formValidatorMesto.enableValidation();
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setIsConfirmationPopupOpen(true);
    setCurrentCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .setCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    api
      .deleteCard(currentCard._id)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((item) => {
            return item._id !== currentCard._id;
          })
        );
        closeAllPopups();
        setCurrentCard({});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .sendUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(url) {
    api
      .sendAvatarInfo(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .sendNewPostInfo({
        name: data.name,
        link: data.link,
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClosePopup(evt) {
    if (evt.key === "Escape" || evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function linkToLogin() {
    navigate("/sign-in");
    setHeaderText("Регистрация");
  }

  function linkToRegister() {
    navigate("/sign-up");
    setHeaderText("Войти");
  }

  function linkToProfile() {
    navigate("/mesto-react");
    setHeaderText("Выйти");
  }

  function handleRegistration(password, email) {
    register(password, email)
      .then(() => {
        setIsRegisteredSuccessfully(true);
        setIsInfoTooltipOpen(true);
        linkToLogin();
      })
      .catch((err) => {
        setIsRegisteredSuccessfully(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleAuthorization(password, email) {
    authorize(password, email)
      .then(() => {
        linkToProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="page"
      onKeyDown={handleClosePopup}
      onClick={handleClosePopup}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          loginText={headerText}
          linkToLogin={linkToLogin}
          linkToRegister={linkToRegister}
        />
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/sign-up"
            element={
              <Register
                linkToLogin={linkToLogin}
                onRegistration={handleRegistration}
              />
            }
          />
          <Route
            path="/mesto-react"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onCardDelete={handleDeleteCardClick}
                    onCardLike={handleCardLike}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                  />
                }
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/mesto-react" />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmCardDeletePopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isRegistered={isRegisteredSuccessfully}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
