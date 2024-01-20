const options = {
  link: "https://api.karpov.students.nomoredomainsmonster.ru",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`, 
    "Content-Type": "application/json",
  },
};

class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  getUserData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  _processingServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  sendUserData(obj) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    });
  }

  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarLink.link,
      }),
    }).then((res) => {
      return this._processingServerResponse(res);
    }); 
  }

  changeLikeCardStatus(cardId, method) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    }).then((res) => {
    return this._processingServerResponse(res)
  });
}

  // putCardLike(cardId) {
  //   return fetch(`${this._link}cards/${cardId}/likes`, {
  //     headers: this._headers,
  //     method: "PUT",
  //   }).then((res) => {
  //     return this._processingServerResponse(res);
  //   });
  // }

  // deleteCardLike(cardId) {
  //   return fetch(`${this._link}cards/${cardId}/likes`, {
  //     headers: this._headers,
  //     method: "DELETE",
  //   }).then((res) => {
  //     return this._processingServerResponse(res);
  //   });
  // }
}

const api = new Api(options);

export default api;
