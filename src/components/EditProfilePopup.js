import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
	const [name, setName] = React.useState('')
	const [description, setDescription] = React.useState('')
	const currentUser = React.useContext(CurrentUserContext)

	// После загрузки текущего пользователя из API
	// его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
		setName(currentUser.name)
		setDescription(currentUser.about)
	}, [currentUser, props.isOpen])

	function handleChangeName(e) {
		setName(e.target.value)
	}
	function handleChangeDescription(e) {
		setDescription(e.target.value)
	}

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault()

		// Передаём значения управляемых компонентов во внешний обработчик
		props.onUpdateUser({
			name: name,
			about: description,
		})
	}

	return (
		<PopupWithForm
			name="edit"
			title="Редактировать профиль"
			textButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
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
						value={name || ''}
						onChange={handleChangeName}
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
						value={description || ''}
						onChange={handleChangeDescription}
					/>
					<span className="popup__info-error job-input-error"></span>
				</>
			}
		/>
	)
}

export default EditProfilePopup
