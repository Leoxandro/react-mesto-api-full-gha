import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "./hooks/useForm";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const { values, handleChange, setValues } = useForm({
    place: "",
    link: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
    setValues({ 
      place: "",
      link: ""
    });
  }

  useEffect(() => {
    if(!isOpen) {
      setValues({
        place: "",
        link: ""
      })
    }
  }, [isOpen, setValues]);


  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Добавить"}
    >
      <input
        onChange={handleChange}
        value={values.place}
        id="place"
        className="popup__item"
        name="place"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span 
        id="place-input-error" 
        className="popup__input-error" 
      />
      <input
        onChange={handleChange}
        value={values.link}
        id="link"
        className="popup__item"
        name="link"
        type="url"
        placeholder="Ссылка на страницу"
        required
      />
      <span 
        id="link-input-error" 
        className="popup__input-error"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
