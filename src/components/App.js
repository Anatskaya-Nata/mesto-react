import React from 'react'
import '../index.css'
import Header from './landing/Header'
import Main from './landing/Main'
import Footer from './landing/Footer'
import PopupWithForm from './landing/PopupWithForm'
import ImagePopup from './landing/ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext'
import EditProfilePopup from './landing/EditProfilePopup'
import EditAvatarPopup from './landing/EditAvatarPopup'
import AddPlacePopup from './landing/AddPlacePopup'

function App() {
	const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false)
	const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false)
	const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false)
	const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState({})
	const [cards, setCards] = React.useState([])
	const [currentUser, setCurrentUser] = React.useState('')

	React.useEffect(() => {
		api
			.getFullPageInfo()
			.then(([cardData, userData]) => {
				setCards(cardData)
				setCurrentUser(userData)
			})
			.catch((err) => console.log(err))
	}, [])

	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some((i) => i._id === currentUser._id)

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				// Формируем новый массив на основе имеющегося, подставляя в него новую карточку
				const newCards = cards.map((c) => (c._id === card._id ? newCard : c))
				// Обновляем стейт
				setCards(newCards)
			})
			.catch((err) => {
				console.log(`Не удалось поставить лайк. ${err}`)
			})
	}

	function handleCardDelete(card) {
		// Определяем, являемся ли мы владельцем текущей карточки
		const isOwn = card.owner._id === currentUser._id
		//Cоздаем копию массива, исключив из него удалённую карточку.
		api
			.deleteCard(card._id, isOwn)
			.then(() => {
				const newArr = cards.filter((c) => c._id !== card._id)
				setCards(newArr)
			})
			.catch((err) => {
				console.log(`Ошибка при удалении карточки. ${err}`)
			})
	}

	function handleUpdateUser({ name, about }) {
		api
			.setUserData({ name, about })
			.then((user) => {
				setCurrentUser(user)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка при обновлении данных пользователя. ${err}`)
			})
	}

	function handleUpdateAvatar({ avatar }) {
		api
			.setUserAvatar({ avatar })
			.then((user) => {
				setCurrentUser(user)
				closeAllPopups()
				console.log({ avatar })
			})
			.catch((err) => {
				console.log(`Ошибка при обновлении аватара пользователя. ${err}`)
			})
	}

	function handleAddPlaceSubmit({ name, link }) {
		api
			.setMyCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards])
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке новой карточки. ${err}`)
			})
	}

	const handleEditAvatarClick = () => {
		setisEditAvatarPopupOpen((isEditAvatarPopupOpen) => !isEditAvatarPopupOpen)
	}
	const handleAddPlaceClick = () => {
		setisAddPlacePopupOpen((isAddPlacePopupOpen) => !isAddPlacePopupOpen)
	}
	const handleEditProfileClick = () => {
		setisEditProfilePopupOpen((isEditProfilePopupOpen) => !isEditProfilePopupOpen)
	}

	function handleCardClick(item) {
		setImagePopupOpen((isImagePopupOpen) => !isImagePopupOpen)
		setSelectedCard(item)
	}

	const closeAllPopups = () => {
		setisEditProfilePopupOpen(false)
		setisAddPlacePopupOpen(false)
		setisEditAvatarPopupOpen(false)
		setImagePopupOpen(false)
		setSelectedCard({})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<CardContext.Provider value={cards}>
				<div style={{ background: '#000' }}>
					<div className="page">
						<Header />
						<Main
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>

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
						<PopupWithForm name="approval" title="Вы уверены? " textButton="Да" />

						<ImagePopup
							name="image"
							isOpen={isImagePopupOpen ? 'popup_active' : ''}
							//isOpen={isImagePopupOpen && `active`}
							onClose={closeAllPopups}
							card={selectedCard}
						/>
					</div>
				</div>
			</CardContext.Provider>
		</CurrentUserContext.Provider>
	)
}

export default App
