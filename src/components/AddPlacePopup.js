import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
	const [name, setName] = React.useState('')
	const [link, setlink] = React.useState('')

	function handleChangeName(e) {
		setName(e.target.value)
	}

	function handleChangeLink(e) {
		setlink(e.target.value)
	}

	function handleSubmit(evt) {
		evt.preventDefault()
		props.onAddPlace({
			name,
			link,
		})
	}
	return (
		<PopupWithForm
			name="place"
			title="Новое место"
			textButton={props.isLoading ? 'Сохранение...' : 'Создать'}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
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
						value={name || ''}
						onChange={handleChangeName}
					/>
					<span className="popup__info-error place-input-error "></span>

					<input
						id="link-input"
						type="url"
						name="link"
						placeholder="Ссылка на картинку"
						required
						className="popup__info popup__info_input_link"
						value={link || ''}
						onChange={handleChangeLink}
					/>
					<span className="popup__info-error link-input-error"></span>
				</>
			}
		/>
	)
}

export default AddPlacePopup
