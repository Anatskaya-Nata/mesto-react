class Api {
	constructor({ address, token, groupID }) {
		this._address = address
		this._token = token
		this._groupID = groupID
	}

	getFullPageInfo() {
		return Promise.all([this.getCards(), this.getUserData()])
	}

	getCards() {
		return fetch(`${this._address}/cards`, {
			headers: {
				authorization: this._token,
			},
		}).then(this._checkResponse)
	}
	getUserData() {
		return fetch(`${this._address}/users/me`, {
			method: 'GET',
			headers: {
				authorization: this._token,
			},
		}).then(this._checkResponse)
	}

	setUserData(data) {
		return fetch(`${this._address}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about,
				avatar: data.avatar,
			}),
		}).then(this._checkResponse)
	}

	setLike(id) {
		return fetch(`${this._address}/cards/likes/${id}`, {
			method: 'PUT',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	changeLikeCardStatus(id, like) {
		return fetch(`${this._address}/cards/likes/${id}`, {
			method: like ? 'PUT' : 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	deleteLike(id) {
		return fetch(`${this._address}/cards/likes/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	deleteCard(id) {
		return fetch(`${this._address}/cards/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	// DELETE

	setMyCard(item) {
		return fetch(`${this._address}/cards`, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: item.name,
				link: item.link,
			}),
		}).then(this._checkResponse)
	}

	setUserAvatar(data) {
		return fetch(`${this._address}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: data.link,
			}),
		}).then(this._checkResponse)
	}
	_checkResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`)
		}
		return res.json()
	}
}

const config = {
	address: 'https://mesto.nomoreparties.co/v1/cohort-24',
	token: 'cf1392bf-57d4-4bdf-840f-466cfe9d8ed2',
	groupID: 'cohort-24',
}

const api = new Api(config)

export default api
