import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
	const avatarRef = React.useRef()

	function handleSubmit(e) {
		e.preventDefault()

		props.onUpdateAvatar({
			avatar: avatarRef.current.value,
		})
	}

	return (
		<PopupWithForm
			name="avatar"
			//isEditAvatarPopupOpen={true}
			title="Обновить аватар"
			textButton="Cохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			children={
				<>
					<input
						id="avatar-input"
						type="url"
						name="link"
						ref={avatarRef}
						placeholder="Ссылка на картинку"
						required
						className="popup__info popup__info_input_avatar"
					/>
					<span className="popup__info-error link-input-error"></span>
				</>
			}
		/>
	)
}

export default EditAvatarPopup
