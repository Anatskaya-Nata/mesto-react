import React from 'react'
import PopupWithForm from './PopupWithForm'

function ApprovalPopup(props) {
	const handleCardDelete = (evt) => {
		evt.preventDefault()
		props.onCardDelete()
	}

	return (
		<PopupWithForm
			name="approval"
			title="Вы уверены? "
			textButton="Да"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleCardDelete}
		/>
	)
}
export default ApprovalPopup
