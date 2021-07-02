import React from 'react'
import '../index.css'
import Header from './landing/Header'
import Main from './landing/Main'
import Footer from './landing/Footer'
import PopupWithForm from './landing/PopupWithForm'
import ImagePopup from './landing/ImagePopup'
import api from '../utils/Api'
import Card from './landing/Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext'
function App() {
	const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false)
	const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false)
	const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false)
	const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState({})

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

	const [cards, setCards] = React.useState([])
	const [currentUser, setCurrentUser] = React.useState('')

	console.log(currentUser)
	console.log(cards)

	React.useEffect(() => {
		api
			.getFullPageInfo()
			.then(([cardData, userData]) => {
				setCards(cardData)
				setCurrentUser(userData)
			})
			.catch((err) => console.log(err))
	}, [])

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
						/>

						<Footer />
						<PopupWithForm
							name="edit"
							title="Редактировать профиль"
							textButton="Cохранить"
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							children={
								<>
									<input
										id="text-input"
										type="text"
										className="popup__info  popup__info_input_name"
										name="nick"
										placeholder="Имя"
										required
										minLength="2"
										maxLength="40"
									/>
									<span className="popup__info-error text-input-error"></span>

									<input
										id="job-input"
										type="text"
										name="about"
										placeholder="О себе"
										required
										minLength="2"
										maxLength="200"
										className="popup__info popup__info_input_job"
									/>
									<span className="popup__info-error job-input-error"></span>
								</>
							}
						/>
						<PopupWithForm
							name="place"
							title="Новое место"
							textButton="Создать"
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							children={
								<>
									<input
										id="place-input"
										type="text"
										name="place"
										placeholder=" Название"
										required
										minLength="2"
										maxLength="30"
										className="popup__info popup__info_input_place"
									/>
									<span className="popup__info-error place-input-error "></span>

									<input
										id="link-input"
										type="url"
										name="link"
										placeholder="Ссылка на картинку"
										required
										className="popup__info popup__info_input_link"
									/>
									<span className="popup__info-error link-input-error"></span>
								</>
							}
						/>
						<PopupWithForm name="approval" title="Вы уверены? " textButton="Да" />
						<PopupWithForm
							name="avatar"
							//isEditAvatarPopupOpen={true}
							title="Обновить аватар"
							textButton="Cохранить"
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							children={
								<>
									<input
										id="avatar-input"
										type="url"
										name="link"
										placeholder="Ссылка на картинку"
										required
										className="popup__info popup__info_input_avatar"
									/>
									<span className="popup__info-error link-input-error"></span>
								</>
							}
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
