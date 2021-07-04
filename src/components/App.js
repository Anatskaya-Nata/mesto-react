import React from 'react'
import '../index.css'
import Header from './landing/Header'
import Main from './landing/Main'
import Footer from './landing/Footer'
//import PopupWithForm from './landing/PopupWithForm'
import ImagePopup from './landing/ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext'
import EditProfilePopup from './landing/EditProfilePopup'
import EditAvatarPopup from './landing/EditAvatarPopup'
import AddPlacePopup from './landing/AddPlacePopup'
import ApprovalPopup from './landing/ApprovalPopup'

function App() {
	const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false)
	const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false)
	const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false)
	const [isApprovalPopupOpen, setIsApprovalPopupOpen] = React.useState(false)
	const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState({})
	const [deletedCard, setDeletedCard] = React.useState({})
	const [cards, setCards] = React.useState([])
	const [currentUser, setCurrentUser] = React.useState('')
	const [isPopupLoading, setIsPopupLoading] = React.useState(false)

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

	const handleCardDelete = () => {
		// Определяем, являемся ли мы владельцем текущей карточки
		const isOwn = deletedCard.owner._id === currentUser._id
		//Cоздаем копию массива, исключив из него удалённую карточку.
		console.log(deletedCard)
		api
			.deleteCard(deletedCard._id, isOwn)
			.then(() => {
				const newArr = cards.filter((c) => c._id !== deletedCard._id)
				setCards(newArr)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка при удалении карточки. ${err}`)
			})
			.finally(() => {
				setIsPopupLoading(false)
			})
	}

	function handleUpdateUser({ name, about }) {
		setIsPopupLoading(true)
		api
			.setUserData({ name, about })
			.then((user) => {
				setCurrentUser(user)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка при обновлении данных пользователя. ${err}`)
			})
			.finally(() => {
				setIsPopupLoading(false)
			})
	}

	function handleUpdateAvatar({ avatar }) {
		setIsPopupLoading(true)
		api
			.setUserAvatar({ avatar })
			.then((user) => {
				setCurrentUser(user)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка при обновлении аватара пользователя. ${err}`)
			})
			.finally(() => {
				setIsPopupLoading(false)
			})
	}

	function handleAddPlaceSubmit({ name, link }) {
		setIsPopupLoading(true)
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

	function handleMyCardDelite(card) {
		setDeletedCard(card)
		setIsApprovalPopupOpen(true)
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
		setIsApprovalPopupOpen(false)
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
							onCardDelete={handleMyCardDelite}
						/>

						<Footer />
						<EditProfilePopup
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							onUpdateUser={handleUpdateUser}
							isLoading={isPopupLoading}
						/>
						<EditAvatarPopup
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							onUpdateAvatar={handleUpdateAvatar}
							isLoading={isPopupLoading}
						/>
						<AddPlacePopup
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							onAddPlace={handleAddPlaceSubmit}
							isLoading={isPopupLoading}
						/>
						<ApprovalPopup
							isOpen={isApprovalPopupOpen}
							onClose={closeAllPopups}
							onCardDelete={handleCardDelete}
						/>

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
